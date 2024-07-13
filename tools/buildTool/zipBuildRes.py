# encoding: utf-8
import importlib
import os
import sys
import time
import datetime
import json
import zipfile
import shutil
import argparse  # 参数解析
from EnumCode import CREATOR_BUILD_TYPE


IS_PY3 = True
print('PYTHON VERSION ' + str(sys.version_info))
if (sys.version_info < (3, 0)):
    IS_PY3 = False
else:
    IS_PY3 = True
print('PYTHON VERSION  is py3:' + str(IS_PY3))


if (not IS_PY3):
    reload(sys)
    sys.setdefaultencoding('utf-8')
else:
    importlib.reload(sys)
    # sys.setdefaultencoding('utf8')

curBuild = 1

exceptPath = []
exceptFile = []  # 排除的文件
file_path = []


def getNameList(dir, wildcard, recursion, abspath):
    exts = wildcard.split(" ")
    files = os.listdir(dir)
    for name in files:
        isExceptDir = name in exceptPath
        isExceptFile = name in exceptFile
        if isExceptDir or isExceptFile:
            print('exceptname ...' + name)
            continue

        fullname = os.path.join(dir, name)
        if os.path.isdir(fullname) & recursion:
            getNameList(fullname, wildcard, recursion, abspath)
        else:
            for ext in exts:
                if(name.endswith(ext)):
                    if abspath:
                        file_path.append(os.path.abspath(fullname))
                    else:
                        file_path.append(fullname)

                    # print(fullname)
                    break


def zip_files(files, zip_name):
    zip = zipfile.ZipFile(zip_name, 'w', zipfile.ZIP_DEFLATED)
    for file in files:
        # print ('compressing ', file)
        zip.write(file)
    zip.close()
    print('compressing finished ' + zip_name)


def run():
    cwp = os.getcwd()
    os.chdir('../../build/web-mobile/')
    getNameList('./', "", 1, False)
    zipFile = "zip_h5_%s.zip" % (curBuild)

    zip_files(file_path,  zipFile)
    print(zipFile + ' gennerator h5 resZip success ')


if __name__ == "__main__":
    argParse1 = argparse.ArgumentParser('zip build params')
    argParse1.add_argument('-p', '--projPath', default='')
    argParse1.add_argument('-jv', '--jenkinsVersion', default='0')
    argParse1.add_argument('-n', '--zipName', default='0')
    argParse1.add_argument('-sv', '--settingVersion', default='0')
    argParse1.add_argument('-b', '--buildType', default='0')
    argParse1.add_argument('-dataAllOnly', '--dataAllOnly', default='false')
    args = argParse1.parse_args()
    print('=====> start Zip Files ' + str(args))
    sys.stdout.flush()

    projPath = args.projPath
    zipName = args.zipName
    settingVersion = args.settingVersion
    curBuild = args.jenkinsVersion
    buildType = args.buildType
    dataAllOnly = args.dataAllOnly  # 只要锁dataAll 目录和对应的setting/md5.json 文件

    cwp = os.getcwd()
    os.chdir(projPath)
    zipFile = "../../zip_{}_{}.zip".format(curBuild, zipName)

    if (buildType == CREATOR_BUILD_TYPE.WEB_MOBILE  or buildType == CREATOR_BUILD_TYPE.HUA_WEI):  # CREATOR_BUILD_TYPE.WEB_MOBILE
        if (dataAllOnly == 'True'):
            settingPath = './assets/hotupdate.json'
            file_path.append(settingPath)
            getNameList('./assets/datas/', "", 1, False)
        else:
            getNameList('./', "", 1, False)
        zipFile = "../zip_{}_{}.zip".format(curBuild, zipName)
        pass
    elif (buildType == CREATOR_BUILD_TYPE.WECHAT_GAME):  # CREATOR_BUILD_TYPE.WECHAT_GAME
        if (dataAllOnly == 'True'):
            settingPath = './remote/hotupdate.json'
            file_path.append(settingPath)
            getNameList('./remote/datas/', "", 1, False)
        else:
            getNameList('./remote/', "", 1, False)
        zipFile = "../zip_{}_{}.zip".format(curBuild, zipName)
        pass
    elif (buildType == CREATOR_BUILD_TYPE.BYTE_DANCE):  # CREATOR_BUILD_TYPE.BYTE_DANCE
        if (dataAllOnly == 'True'):
            settingPath = './remote/hotupdate.json'
            file_path.append(settingPath)
            getNameList('./remote/datas/', "", 1, False)
        else:
            getNameList('./remote/', "", 1, False)
        zipFile = "../zip_{}_{}.zip".format(curBuild, zipName)
        pass
    elif (buildType == CREATOR_BUILD_TYPE.IOS or buildType == CREATOR_BUILD_TYPE.ANDROID):
        cwp = os.getcwd()
        os.chdir(projPath+'/data')
        # file_path.append('./main.js')
        getNameList('./assets/', "", 1, False)
        getNameList('./src/', "", 1, False)
        getNameList('./jsb-adapter/', "", 1, False)
        file_path.append('./main.js')

        # getNameList('./data/main.js', "", 1, False)

    # if (os.path.exists(settingPath)):
    #     file_path.append(settingPath)
    #     getNameList('./remote/', "", 1, False)
    # else:
    #     getNameList('./', "", 1, False)

    # zipFile = "../zip_{}_{}.zip".format(curBuild, zipName)
    print(zipFile + ' is zipping.... ')

    zip_files(file_path,  zipFile)
    print(zipFile + ' gennerator resZip success ')
    sys.stdout.flush()
