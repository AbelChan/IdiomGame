#!/usr/bin/env python
# -*- coding: utf-8 -*-
# """
# @author xuan
# @desc 构建，发布工具
# @date 2022-5-25 14:13:39


# python build.py -b true --buildType web-mobile --jenkinsVersion 100
# """

import json
import os
import sys
import hashlib
import shutil
import argparse  # 参数解析
import importlib
import time
import datetime
# from EnumCode import CREATOR_BUILD_TYPE

from BuildWx import buildWx
from BuildH5 import buildH5
from BuildByteDance import buildByteDance
from FileOpt import FileOpt


IS_PY3 = True
print('PYTHON VERSION ' + str(sys.version_info))
if (sys.version_info < (3, 0)):
    IS_PY3 = False
else:
    IS_PY3 = True
print('PYTHON VERSION  is py3:' + str(IS_PY3))

try:
    import demjson
except ImportError:
    cmd = 'pip install demjson'
    if (IS_PY3):
        cmd = 'pip3 install demjson'
    os.system(cmd)
    import demjson

    pass

if (not IS_PY3):
    reload(sys)
    sys.setdefaultencoding('utf-8')
else:
    importlib.reload(sys)
    # sys.setdefaultencoding('utf8')


class CREATOR_BUILD_TYPE(object):
    """
    creator 构建类型
    """
    WECHAT_GAME = 'wechatgame'  # 微信小游戏
    WEB_MOBILE = 'web-mobile'  # H5
    ANDROID = 'android'  # 安卓
    IOS = 'ios'  # IOS
    BYTE_DANCE = 'bytedance'  # 头条小游戏
    HUA_WEI = 'huawei'
    XIAO_MI = 'xiaomi'  # 小米
    OPPO_GAME = 'quickgame'  # oppo 小游戏
    VIVO_GAME = 'qgame'  # vivo 小游戏


# 工程相对路径
PROJ_PATH = './../../'
CREATOR_VERSION = "3.5.2"  # creator 版本号
B_BUILD = True  # 是否构建
BUILD_TYPE = CREATOR_BUILD_TYPE.WEB_MOBILE  # 构建类型
IS_DEBUG = False  # 是否构建debug版本
IS_CHECK = False  # 是否是审核包
SETTING_VERSION = 0  # 游戏包版本号
ZIP_DATA_ALL_ONLY = False  # 仅压缩所有data_all
PROJ_TYPE_ARR = []  # 所有需要打包的projType
BUILD_NUMBER = 0  # 构建序号
SYNC_INTRANET = False  # 是否同步22
BUILD_CFG = {}  # 构建配置，读取cocos的构建配置内容


def getCocosExe():
    """
    获取creator 运行程序路径
    """
    exePath = ''
    print('system: ' + sys.platform)

    if (sys.platform == 'win32'):
        cfg = FileOpt.readJsonFile('./buildCfgs/config')
        exePath = cfg['CocosDashboardPath']
        exePath = exePath + 'Creator/{}/CocosCreator.exe'.format(CREATOR_VERSION)
        # exePath = exePath + \
        #     '/resources/.editors/Creator/{}/CocosCreator.exe'.format(
        #         CREATOR_VERSION)
    else:
        exePath = '/Applications/CocosCreator/Creator/{}/CocosCreator.app/Contents/MacOS/CocosCreator'.format(
            CREATOR_VERSION)
    sys.stdout.flush()
    return exePath


def str2bool(val):
    if isinstance(val, bool):
        return val
    if val.lower() in ('true', 'yes', 't', 'y', '1'):
        return True
    elif val.lower() in ('false', 'no', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')


def parseArgument():
    sys.stdout.flush()
    arg_parse = argparse.ArgumentParser('fix setting params')
    arg_parse.add_argument('-b', '--build', default=True, type=str2bool)
    arg_parse.add_argument('-bt', '--buildType',
                           default='bytedance', type=str)
    arg_parse.add_argument('-v', '--version', default='0', type=str)
    arg_parse.add_argument('-pts', '--projTypes', default='ALL', type=str)
    arg_parse.add_argument('-debug', '--debug', default=False, type=str2bool)
    arg_parse.add_argument('-jv', '--jenkinsVersion', default=1, type=int)
    arg_parse.add_argument('-c', '--check', default=False, type=str2bool)
    arg_parse.add_argument(
        '-creatorVersion', '--creatorVersion', default='3.5.2', type=str)
    arg_parse.add_argument(
        '-zipdata', '--zipDataAllOnly', default=False, type=str2bool)  # 暂时不用
    arg_parse.add_argument('-sync', '--sync_intranet', default=False, type=str2bool)

    args = arg_parse.parse_args()
    print(u'args : ' + str(args))
    sys.stdout.flush()

    global CREATOR_VERSION  # creator 版本号
    global B_BUILD  # 是否构建
    global BUILD_TYPE  # 构建类型
    global IS_DEBUG  # 是否构建debug版本
    global IS_CHECK  # 是否是审核包
    global SETTING_VERSION  # 游戏包版本号
    global ZIP_DATA_ALL_ONLY  # 仅压缩所有data_all
    global PROJ_TYPE_ARR  # 所有需要打包的projType
    global BUILD_NUMBER  # 构建序号
    global SYNC_INTRANET  # 是否同步22

    B_BUILD = args.build  # 是否构建
    BUILD_TYPE = args.buildType  # 构建类型, CREATOR_BUILD_TYPE
    IS_DEBUG = args.debug
    IS_CHECK = args.check  # 是否是审核, 0是false， 1是true
    SETTING_VERSION = args.version  # setting版本

    projTypes = args.projTypes  # 需要打包的类型
    projTypesArr = projTypes.split(",")
    print("projTypes", projTypesArr)
    if projTypesArr[0] == "ALL":
        projTypesArr = getAllProjTypesByBuildType(BUILD_TYPE)
    print("projTypes", projTypesArr)
    PROJ_TYPE_ARR = projTypesArr

    ZIP_DATA_ALL_ONLY = args.zipDataAllOnly  # 只压缩dataAll

    BUILD_NUMBER = args.jenkinsVersion  # jenkins 构建序号
    CREATOR_VERSION = args.creatorVersion  # creator 版本

    SYNC_INTRANET = args.sync_intranet  # 是否同步到22 DGZ-A
    modifyBuildCfg()


def getBuildCfgFile():
    cfgFile = './buildCfgs/buildConfig_web-mobile'
    if BUILD_TYPE == CREATOR_BUILD_TYPE.WEB_MOBILE or BUILD_TYPE == CREATOR_BUILD_TYPE.HUA_WEI:
        cfgFile = './buildCfgs/buildConfig_web-mobile'
    elif BUILD_TYPE == CREATOR_BUILD_TYPE.ANDROID:
        cfgFile = './buildCfgs/buildConfig_android'
    elif BUILD_TYPE == CREATOR_BUILD_TYPE.WECHAT_GAME:
        cfgFile = './buildCfgs/buildConfig_wechatgame'
    elif (BUILD_TYPE == CREATOR_BUILD_TYPE.IOS):
        cfgFile = './buildCfgs/buildConfig_ios'
    elif (BUILD_TYPE == CREATOR_BUILD_TYPE.BYTE_DANCE):
        cfgFile = './buildCfgs/buildConfig_bytedance-mini-game'
    return cfgFile


def modifyBuildCfg():
    """
    修改构建配置文件
    """
    global BUILD_CFG
    cfgFile = getBuildCfgFile()
    BUILD_CFG = FileOpt.readJsonFile(cfgFile)
    if B_BUILD:
        BUILD_CFG['debug'] = IS_DEBUG
    FileOpt.writeJsonFile(BUILD_CFG, cfgFile)


def creatorBuild(creatorBuildType):
    """
    creator 构建  
    @creatorBuildType creator 构建类型  
    @bOnlyScript 是否只构建脚本  
    """
    # 只构建脚本
    cfgFile = getBuildCfgFile()

    exePath = getCocosExe()
    cmd = exePath + ' --project ' + PROJ_PATH + \
        ' --build "configPath={}.json"'
    print('cmd:' + cmd.format(cfgFile))
    os.system(cmd.format(cfgFile))
    if creatorBuildType == CREATOR_BUILD_TYPE.WECHAT_GAME or creatorBuildType == CREATOR_BUILD_TYPE.BYTE_DANCE:
        deleteBundleScripts()


def deleteBundleScripts():
    outputDestDir = PROJ_PATH + "build/" + BUILD_CFG['outputName']+"/src/bundle-scripts/"
    bundleNames = []
    _file_list = os.listdir(outputDestDir)
    for _name in _file_list:
        _fix_file = os.path.join(outputDestDir, _name)
        if os.path.isdir(_fix_file):
            bundleNames.append(_name)
    oldContent = "const resBundles = [];"
    newContent = "const resBundles = [{}];".format(
        ",".join(str("'"+i+"'") for i in bundleNames))
    FileOpt.fixContent(outputDestDir + "index.js", oldContent, newContent)
    FileOpt.delDir(outputDestDir, ["index.js"])


def zipResource(projPath, version, zipName):
    """
    将h5 压缩到zip文件
    """
    cmd = 'python zipBuildRes.py -p {} -jv {} -n {} -b {} -dataAllOnly {}'.format(
        projPath, version, zipName, BUILD_TYPE, ZIP_DATA_ALL_ONLY)
    print('=====> zip H5', cmd)
    os.sys.stdout.flush()
    os.system(cmd)


def syncZipTo22(jv, remoteDir, zipName):
    cmd = 'python3 AutoSync22.py -jv {} -dir {} -zipname {}'.format(
        jv, remoteDir, zipName)
    os.system(cmd)
    pass


def syncZipToServer(jv, remoteDir, zipName):
    cmd = 'python AutoSyncServer.py -jv {} -dir {} -zipname {}'.format(
        jv, remoteDir, zipName)
    os.system(cmd)
    pass


def getProjCfgByType(projType):
    '''
    获取工程json配置
    @projType 工程类型
    '''
    PROJ_CFGS = FileOpt.readJsonFile('./buildCfgs/config')
    cfgList = PROJ_CFGS['list']

    for data in cfgList:
        if data['projType'] == projType:
            return data
    return None


def getProjCfgesByBuildType(buildType):
    """
        通过buildType获得所有配置
        目前只有zipH5 和 zipWX两个字段判断
        各快游戏和头条小游戏，限定了proType
    """
    PROJ_CFGS = FileOpt.readJsonFile('./buildCfgs/config')
    cfgList = PROJ_CFGS['list']
    cfges = []
    for data in cfgList:
        cfg = data
        if buildType in cfg['buildType']:
            cfges.append(cfg)
    return cfges


def getAllProjTypesByBuildType(buildType):
    cfges = getProjCfgesByBuildType(buildType)
    projTypes = []
    for data in cfges:
        projTypes.append(data['projType'])
    return projTypes


def main():
    print('fix setting file start ...')
    start_time = datetime.datetime.now()
    # 解析参数
    parseArgument()

    if BUILD_TYPE == '0':
        print(u'=====> !!!!! buildType构建类型参数有误[{}]'.format(BUILD_TYPE))
        print(u'=====> ！！！！！ 请重新启动 ！！！！！！')
        os.sys.stdout.flush()
        return

    if BUILD_TYPE == CREATOR_BUILD_TYPE.WEB_MOBILE or BUILD_TYPE == CREATOR_BUILD_TYPE.HUA_WEI:
        buildH5.initCfg(PROJ_PATH, PROJ_TYPE_ARR)
    elif BUILD_TYPE == CREATOR_BUILD_TYPE.WECHAT_GAME:
        buildWx.initCfg(PROJ_PATH, PROJ_TYPE_ARR, SETTING_VERSION)
    elif BUILD_TYPE == CREATOR_BUILD_TYPE.BYTE_DANCE:
        buildByteDance.initCfg(PROJ_PATH, PROJ_TYPE_ARR, SETTING_VERSION)

    idx = 0
    # 构建
    print(u'=====> !!!!! 是否构建[{}]'.format(B_BUILD))
    if B_BUILD and not ZIP_DATA_ALL_ONLY:
        idx = idx + 1
        print(u'=====> {}. 构建工程'.format(str(idx)))
        os.sys.stdout.flush()
        creatorBuild(BUILD_TYPE)

    projectDir = PROJ_PATH + "assets/"
    outputDestDir = PROJ_PATH + "build/"+BUILD_CFG['outputName']+"/"
    if BUILD_TYPE == CREATOR_BUILD_TYPE.WECHAT_GAME or BUILD_TYPE == CREATOR_BUILD_TYPE.BYTE_DANCE:
        outputDestDir = outputDestDir + "remote/"
    elif BUILD_TYPE == CREATOR_BUILD_TYPE.WEB_MOBILE or BUILD_TYPE == CREATOR_BUILD_TYPE.HUA_WEI:
        outputDestDir = outputDestDir + "assets/"
    elif BUILD_TYPE == CREATOR_BUILD_TYPE.IOS:
        outputDestDir = outputDestDir + "assets/assets/"

    idx = idx + 1
    print(u'=====> {}. 开始处理、压缩 渠道包'.format(str(idx)))
    os.sys.stdout.flush()
    # 开始处理、压缩 渠道包
    packageid = 0
    for projType in PROJ_TYPE_ARR:
        cfgData = getProjCfgByType(projType)
        packageid = packageid+1
        stepid = 0
        print(u'=====> {}.{}.{} 开始处理渠道 {}'.format(
            str(idx), str(packageid), str(stepid), cfgData['projType']))
        if BUILD_TYPE not in cfgData['buildType']:
            continue
        zipDir = outputDestDir
        if (BUILD_TYPE == CREATOR_BUILD_TYPE.WEB_MOBILE or BUILD_TYPE == CREATOR_BUILD_TYPE.WECHAT_GAME or 
            BUILD_TYPE == CREATOR_BUILD_TYPE.IOS or BUILD_TYPE == CREATOR_BUILD_TYPE.HUA_WEI or BUILD_TYPE == CREATOR_BUILD_TYPE.BYTE_DANCE):   
            # stepid = stepid + 1
            # print(u'=====> {}.{}.{} 复制data_all资源'.format(
            #     str(idx), str(packageid), str(stepid)))
            # if BUILD_TYPE == CREATOR_BUILD_TYPE.WECHAT_GAME or BUILD_TYPE == CREATOR_BUILD_TYPE.BYTE_DANCE:
            #     if ZIP_DATA_ALL_ONLY:
            #         FileOpt.downloadFile(
            #             cfgData['serverUrl'] + "/remote/hotupdate.json?time=" +
            #             str(time.time() * 1000),
            #             outputDestDir + "hotupdate.json")
            #     else:
            #         FileOpt.downloadFile(cfgData['serverUrl'] + "/remote/hotupdate.json?time=" + str(
            #             time.time()*1000), outputDestDir + "hotupdate_old.json")
            #         if BUILD_TYPE == CREATOR_BUILD_TYPE.WECHAT_GAME:
            #             # 微信处理settings.json文件
            #             buildWx.fixSettings(cfgData, ZIP_DATA_ALL_ONLY)
            #         else:
            #             buildByteDance.fixSettings(cfgData, ZIP_DATA_ALL_ONLY)
            #         FileOpt.delFile(outputDestDir+"hotupdate_old.json")
            # elif BUILD_TYPE == CREATOR_BUILD_TYPE.WEB_MOBILE or BUILD_TYPE == CREATOR_BUILD_TYPE.HUA_WEI:
            #     FileOpt.delFile(outputDestDir+"hotupdate.json")
            #     FileOpt.writeJsonFile({}, outputDestDir+"hotupdate")

            # handle data_all 处理配置表
            # FileOpt.delDir(outputDestDir + "datas/")
            # dataAllCfg = cfgData['dataall']
            # for envPath in dataAllCfg:
            #     FileOpt.copyDir(projectDir + 'resources/datas/{}'.format(envPath),
            #                     outputDestDir + "datas/{}/".format(envPath))
            #     FileOpt.delSuffixFile(
            #         outputDestDir + "datas/{}/".format(envPath), '.meta')
            if BUILD_TYPE == CREATOR_BUILD_TYPE.WEB_MOBILE or BUILD_TYPE == CREATOR_BUILD_TYPE.HUA_WEI:
                buildH5.minTable()
                zipDir = outputDestDir+"../"
            elif BUILD_TYPE == CREATOR_BUILD_TYPE.WECHAT_GAME:
                buildWx.minTable()
                zipDir = outputDestDir+"../"
            elif BUILD_TYPE == CREATOR_BUILD_TYPE.BYTE_DANCE:
                buildByteDance.minTable()
                zipDir = outputDestDir+"../"
            elif BUILD_TYPE == CREATOR_BUILD_TYPE.IOS:
                zipDir = outputDestDir+"../../"

        stepid = stepid + 1
        print(u'=====> {}.{}.{} 压缩资源'.format(
            str(idx), str(packageid), str(stepid)))
        zipResource(zipDir, BUILD_NUMBER, BUILD_TYPE + '-' + projType)


    end_time = datetime.datetime.now()
    print('fix setting finish ....' + str(end_time - start_time))


if __name__ == "__main__":
    main()
    # fixSettingJson('cx_game')
    pass
