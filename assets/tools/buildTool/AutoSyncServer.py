# coding: utf-8

# 一键更新到22
# 1.清空
# 2.拖zip
# 3.解压

import os
import sys
import argparse
import threading
from FtpTool import setNetProxy, set_default_proxy, SFTPTool

reload(sys)
sys.setdefaultencoding('utf-8')

# jenkins构建的zip路径
SRC = './../../build/'
# # 上传路径
# DST = '/mydata/client/html5/{}/'

HOST = '43.138.254.143'
PORT = '22'
USER = 'root'
PWD = 'rBEqp@Bq78XTgBJzV!Vt'


def uploadCB(p1, p2):
    print(
        u'=====> zip 上传进度: {}% {}k/{}k'.format(round(p1*100/p2, 1), round(p1/1024, 1), round(p2/1024, 1)))
    os.sys.stdout.flush()


def unzipFun():
    tool = SFTPTool(HOST, PORT, USER, PWD)
    tool.sftpExecCMD('unzip -o ' + REMOTE_RES + ' -d ' + DST)
    # tool.sftpExecCMD('echo ' + PWD + '|sudo -S chmod -R 777 ' + DST)
    # tool.sftpClose()


def main():
    """
    main
    """

    Arg = argparse.ArgumentParser('Auto Sync params')
    Arg.add_argument('-jv', '--jenkinsVersion', default='0')
    Arg.add_argument('-dir', '--remote22Dir', default='DGZ-A')
    Arg.add_argument('-zipname', '--zipname', default='web-mobile')

    args = Arg.parse_args()

    global ZIP_NAME
    global REMOTE_RES
    global DST

    ZIP_NAME = 'zip_{}_{}.zip'
    # ZIP_NAME = args.zipname  # 压缩包名称
    jv = args.jenkinsVersion  # jenkinsVersion
    remoteDir = args.remote22Dir  # 22 共享上的目录名
    zipname = args.zipname  # 22 共享上的目录名

    DST = '/mydata/client/statics/html5/{}/'
    DST = DST.format(remoteDir)

    if (ZIP_NAME != ''):
        ZIP_NAME = 'zip_{}_{}.zip'

    print('=====> Auto Sync params: ' + str(args))
    os.sys.stdout.flush()

    tool = SFTPTool(HOST, PORT, USER, PWD)

    print(u'=====> #1. 删除22 目录资源')
    os.sys.stdout.flush()
    tool.sftpExecCMD('rm -rf ' + DST +'*')
    # tool.sftpExecCMD('echo ' + PWD + ' chmod -R 775 ' + DST)


    print(u'=====> #2. 上传资源')
    localZip = SRC + ZIP_NAME.format(jv, zipname)
    REMOTE_RES = DST + ZIP_NAME.format(jv, zipname)
    print(u'=====> local:{}'.format(localZip))
    print(u'=====> remote:{}'.format(REMOTE_RES))
    os.sys.stdout.flush()
    tool.sftpUpload(localZip, REMOTE_RES, uploadCB)

    print(u'=====> #3. 解压资源')
    os.sys.stdout.flush()
    threadUnzip = threading.Thread(target=unzipFun)
    threadUnzip.start()
    # tool.sftpExecCMD('echo ' + PWD + ' chmod -R 775 ' + DST)

    print(u'=====> #### 同步完成')
    tool.sftpClose()

    pass


if __name__ == "__main__":
    main()
    pass
