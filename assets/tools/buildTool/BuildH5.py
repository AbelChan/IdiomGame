#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

from FileOpt import FileOpt


class BuildH5(object):
    def __init__(self):
        self.prjPath = ""
        self.prjTypes = []
        self.buildNumber = 0
        self.buildCfg = {}
        self.projCfg = {}

    def initCfg(self, prjPath, prjTypes):
        self.prjPath = prjPath
        self.prjTypes = prjTypes
        self.buildCfg = FileOpt.readJsonFile("./buildCfgs/buildConfig_web-mobile")
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
                dir = self.prjPath + 'build/{}/assets/datas/'.format(self.buildCfg['outputName'])
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
        dataAllDir = self.prjPath + 'build/{}/'.format(self.buildCfg['outputName'])
        settingPath = dataAllDir + 'assets/datas/'
        settingFile = dataAllDir + 'assets/hotupdate'

        # 2 生成所有data文件的md5
        settingJson = {}
        self.handleDataMd5(settingPath, settingJson)
        # 3 写入setting.json文件
        FileOpt.writeJsonFile(settingJson, settingFile)
        pass


buildH5 = BuildH5()
