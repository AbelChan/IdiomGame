#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from FileOpt import FileOpt


class BuildByteDance(object):
    def __init__(self):
        self.prjPath = ""
        self.prjTypes = []
        self.WX_Ver = "1.0.1"
        self.buildNumber = 0
        self.buildCfg = {}
        self.projCfg = {}

    def initCfg(self, prjPath, prjTypes, settingVer):
        self.prjPath = prjPath
        self.prjTypes = prjTypes
        self.WX_Ver = settingVer
        self.buildCfg = FileOpt.readJsonFile("./buildCfgs/buildConfig_bytedance-mini-game")
        self.projCfg = FileOpt.readJsonFile('./buildCfgs/config')['list']
        pass

    def getProjectCfg(self, projType):
        for data in self.projCfg:
            if data['projType'] == projType:
                return data
        return None

    def handleDataMd5(self, path, settingJson):
        fileList = os.listdir(path)
        for fileName in fileList:
            absolutePath = os.path.join(path, fileName)
            isDir = os.path.isdir(absolutePath)
            if isDir:
                self.handleDataMd5(absolutePath, settingJson)
            else:
                md5 = FileOpt.getFileMD5(absolutePath, 5)
                dir = self.prjPath + 'build/{}/remote/datas/'.format(self.buildCfg['outputName'])
                dirLen = len(dir)
                relativePath = absolutePath[dirLen:]
                relativePath = relativePath.replace('\\', '/')
                settingJson["datas/"+relativePath[:-7]] = md5
                # 重命令 带md5
                fileName = os.path.splitext(absolutePath)[0]
                fileType = os.path.splitext(absolutePath)[1]
                os.rename(absolutePath, fileName + '.' + md5 + fileType)

    def minTable(self):
        # 删除所有data_all
        dataAllDir = self.prjPath + 'build/{}/remote/'.format(self.buildCfg['outputName'])
        settingPath = dataAllDir + 'datas/'
        settingFile = dataAllDir + 'hotupdate'
        hotupdateJson = FileOpt.readJsonFile(settingFile)

        # 2 生成所有data文件的md5
        self.handleDataMd5(settingPath, hotupdateJson[self.WX_Ver]['test'])
        # 3 写入setting.json文件
        FileOpt.writeJsonFile(hotupdateJson, settingFile)
        pass


    def fixSettings(self, cfgData, ZIP_DATA_ALL_ONLY):
        filepath = self.prjPath + 'build/{}/remote/'.format(self.buildCfg['outputName'])
        hotupdateJson = FileOpt.readJsonFile(filepath + "hotupdate_old")
        settings_md5_old = ""
        settings_md5_new = ""
        fileList = os.listdir(filepath+"src/")
        for file in fileList:
            settings_md5_new = file[-10:-5]

        if not hotupdateJson or self.WX_Ver not in hotupdateJson:
            if not hotupdateJson:
                hotupdateJson = {}
                hotupdateJson['checkList'] = []
                hotupdateJson['server'] = cfgData['serverUrl']
            hotDataDict = dict()
            hotDataDict['test'] = dict()
            hotDataDict['test']['settings'] = settings_md5_new
            hotDataDict['online'] = dict()
            hotDataDict['online']['settings'] = settings_md5_new
            hotupdateJson[self.WX_Ver] = hotDataDict
        else:
            settings_md5_old = hotupdateJson[self.WX_Ver]['online']['settings']
            # 下载旧版本settings.json
            FileOpt.downloadFile(cfgData['serverUrl'] + "/remote/src/settings.{}.json".format(settings_md5_old), filepath + "src/settings.{}.json".format(settings_md5_old))
            settings_new_context = FileOpt.readJsonFile(filepath +"src/settings.{}".format(settings_md5_new))
            settings_old_context = FileOpt.readJsonFile(filepath +"src/settings.{}".format(settings_md5_old))            
            settings_new_context['bundleVers']['start-scene'] = settings_old_context['bundleVers']['start-scene']            
            for subpack in settings_old_context['subpackages']:
                settings_new_context['bundleVers'][subpack] = settings_old_context['bundleVers'][subpack]
            settings_new_context['jsList'] = settings_old_context['jsList']
            FileOpt.writeJsonFile(settings_new_context, filepath +"src/settings.{}".format(settings_md5_new))
            FileOpt.delFile(filepath +"src/settings.{}.json".format(settings_md5_old))
            hotupdateJson[self.WX_Ver]['test']['settings'] = settings_md5_new
        FileOpt.writeJsonFile(hotupdateJson, filepath+"hotupdate")


buildByteDance = BuildByteDance()
