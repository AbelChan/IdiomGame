# -*- coding: utf-8 -*-
#!/usr/bin/env python

# 文件复制、删除

# from win10toast import ToastNotifier
# import ctypes
import sys
import os
import shutil
import time
import zipfile
import json
import hashlib

from enum import Enum

IS_PY3 = True
if sys.version_info < (3, 0):
    IS_PY3 = False
else:
    IS_PY3 = True
print('PYTHON VERSION is py3:' + str(IS_PY3))

if IS_PY3:
    import urllib.request as UrlRequest
else:
    import urllib2 as UrlRequest


class CONTENT_MATCH_TYPE(Enum):
    """
    文本匹配类型  
    """
    ALL = 0  # 全词匹配
    INCLUDE = 1  # 包含匹配


class MyFileOpt(object):
    def __init__(self):
        pass

    def copyFile(self, source, dest):
        """
        复制文件
        """
        abs_dest_path = os.path.abspath(dest)
        if not os.path.exists(os.path.dirname(abs_dest_path)):
            os.makedirs(os.path.dirname(abs_dest_path))
        shutil.copy(source, dest)


    def copyDir(self, sourceDir, destDir):
        """
        复制目录

        @param sourceDir 源目录
        @param destDir 目标目录
        """
        if (not os.path.exists(sourceDir)):
            print('source path not exist', sourceDir)
        if (not os.path.exists(destDir)):
            os.makedirs(destDir)
            print('create target Path: ', destDir)

        _files_list = os.listdir(sourceDir)
        for file_name in _files_list:
            _fix_source = os.path.join(sourceDir, file_name)
            _fix_dest = os.path.join(destDir, file_name)
            is_dir = os.path.isdir(_fix_source)
            # print('file_name: ', file_name, is_dir)
            if (is_dir):
                print('copy DIR: ', _fix_source, _fix_dest)
                shutil.copytree(_fix_source, _fix_dest)
            else:
                print('copy FILE: ', _fix_source, _fix_dest)
                shutil.copy(_fix_source, _fix_dest)
        os.sys.stdout.flush()

    def delDir(self, dest_dir, except_files=[]):
        """
        删除目录下所有文件及目录

        @param dest_dir 目标目录
        @param except_files 排除不要删的文件、目录名列表
        """
        try:
            _file_list = os.listdir(dest_dir)
            for _name in _file_list:
                _fix_file = os.path.join(dest_dir, _name)
                if os.path.isdir(_fix_file) and _name not in except_files:
                    print("del DIR:", _fix_file)
                    shutil.rmtree(_fix_file)
                else:
                    if _name not in except_files:
                        print("del FILE: ", _fix_file)
                        os.remove(_fix_file)
        except Exception as e:
            print('=====> delDir err')
            print('=====> ' + str(e))
            pass

        os.sys.stdout.flush()

    def delSuffixFile(self, path, suffixName):
        """
        递归删除指定文件类型的所有目录及其子目录下的文件
        """
        for root, dirs, files in os.walk(path):
            for name in files:
                if name.endswith(suffixName):
                    absolutePath = os.path.join(root, name)
                    os.remove(absolutePath)
                    print('====> delSuffixFile ' + absolutePath)

    def delFile(self, filepath):
        if os.path.exists(filepath):
            os.remove(filepath)
        print('====> del file ' + filepath)

    def show(self):
        print('show')

    def zipFile(self, fileNames, zipFileName):
        """
        压缩文件到zip
        @ fileNames 压缩的文件名列表
        @ zipFileName 生成的压缩文件名
        """
        zp = zipfile.ZipFile(zipFileName, 'w', zipfile.ZIP_DEFLATED)
        for file in fileNames:
            zp.write(file)
        zp.close()
        time.sleep(5)
        print('zip finish')

    def unzipFile(self, zipFileName, outFilePath):
        """
        解压缩文件到zip
        @ zipFileName 压缩的文件名
        @ outFilePath 解锁后的文件目录
        """
        f = zipfile.ZipFile(zipFileName, 'r')
        for file in f.namelist():
            f.extract(file, outFilePath)
        pass

    def readJsonFile(self, file_name):
        """
        读取json文件

        @param file_name json文件名，不需要json后缀
        @return json Object对象
        """
        try:
            with open('{}.json'.format(file_name), 'r', encoding="UTF-8") as wf:
                json_obj = json.loads(wf.read())
                return json_obj
        except Exception as e:
            print(e)
            pass


    def writeJsonFile(self, json_str, file_name='setting'):
        """
        写入json文件
        prama json_str json数据
        prama file_name: json文件名，不需要json后缀
        """
        with open('{}.json'.format(file_name), 'w', encoding="UTF-8") as wf:  # /**, encoding='utf-8'**/
            # 将Python对象序列化为JSON中的字符串对象
            # 如果有中文ensure_ascii要设置为False
            # indent代表缩进字符个数
            wf.write(json.dumps(json_str, ensure_ascii=False, indent=4) + '\n')
        pass


    def fixContent(self, fileName, matchStr, newStr, matchMode=CONTENT_MATCH_TYPE.ALL):
        """
        修改文件内容
        @fileName 文件名(路径)
        @matchStr 原本的文本
        @newStr 替换后的文本
        @matchMode 匹配模式 0=全词匹配， 1=包含匹配
        """
        with open(fileName, 'r') as f:
            with open(fileName+'.tmp', 'w') as f2:
                for line in f:
                    if (matchMode == CONTENT_MATCH_TYPE.ALL):
                        line = line.replace(matchStr, newStr)
                    elif (matchMode == CONTENT_MATCH_TYPE.INCLUDE):
                        if (matchStr in line):
                            line = newStr
                    f2.write(line)

        os.remove(fileName)
        os.rename(fileName+'.tmp', fileName)

    def downloadFile(self, url, localPath=''):
        """
        下载文件  
        @url 远程地址  
        @localPath 本地保存地址
        """
        print("=====> url:", url)
        # url = 'http://download.redis.io/releases/redis-5.0.5.tar.gz'

        try:
            f = UrlRequest.urlopen(url)
            data = f.read()
            if (localPath):
                with open(localPath, "wb") as code:
                    code.write(data)
            print("=====> download finish")
        except Exception as e:
            print('=====>!!!!! download fail:', e)
            pass

    def getFileMD5(self, filePath, returnSub=0):
        '''
        获取文件的md5码
        @prama filePath 文件路径  
        @prama returnSub 返回的md5 码，从第0位开始，需要取几位  
        '''
        sys.stdout.flush()
        m = hashlib.md5()
        with open(filePath, 'rb') as f:
            for line in f:
                m.update(line)

        # print('=====>md5 str: ' + str(m))
        md5_code = m.hexdigest()
        print('=====>md5: ' + str(md5_code))
        sys.stdout.flush()
        ret = md5_code
        if (returnSub > 0):
            ret = md5_code[0: returnSub]

        return ret


FileOpt = MyFileOpt()

# def send_windows(exStr=''):
#     # # 弹窗
#     # ctypes.windll.user32.MessageBoxA(0, "msg", "Title", 0)

#     # win10推送消息
#     toaster = ToastNotifier()
#     toaster.show_toast(
#         title=u'客户端更新', msg=u'LYJ_B，测试客户端更新完成\n'+exStr, duration=100)


# if __name__ == "__main__":
#     # fileopt = myfileopt()
#     # fileopt.show()
#     send_windows()
