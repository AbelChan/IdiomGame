#!/usr/bin/env python
# -*- coding: utf-8 -*-

# author: xuan
# date: 2020-11-18 12:31:42
# desc: ftp/sftp文件工具
# 怎么用？

import os
import sys
import ftplib  # 内置库
import socket  # 内置库



IS_PY3 = True
print('PYTHON VERSION ' + str(sys.version_info))
if (sys.version_info < (3, 0)):
    IS_PY3 = False
else:
    IS_PY3 = True
print('PYTHON VERSION  is py3:' + str(IS_PY3))

try:
    import paramiko
except:
    cmd = 'pip install paramiko'
    if (IS_PY3):
        cmd = 'pip3 install paramiko'
    os.system(cmd)
    import paramiko
    pass

try:
    import socks  # 需要安装：pip install pysocks
except:
    cmd = 'pip install pysocks'
    if (IS_PY3):
        cmd = 'pip3 install pysocks'
    os.system(cmd)
    cmd = 'pip install win_inet_pton'
    if (IS_PY3):
        cmd = 'pip3 install win_inet_pton'
    os.system(cmd)

    import socks
    pass


def setNetProxy(proxy, port, user, password, proxyType=socks.PROXY_TYPE_SOCKS5):
    '''
    设置网络代理

    '''
    socks.setdefaultproxy(proxyType, proxy,
                          port, False, user, password)
    socket.socket = socks.socksocket
    pass


def set_default_proxy(proxy_type=None, addr=None, port=None, rdns=True,
                      username=None, password=None):
    socks.set_default_proxy(proxy_type=None, addr=None, port=None, rdns=True,
                            username=None, password=None)


class FTPTool(object):
    """
    ftp 传输工具

    @param host 地址  
    @param port 端口  
    @param user 用户名  
    @param passWord 密码  
    """

    _ftp = None

    _uploadCb = None  # 上传回调
    _downloadCb = None  # 下载回调

    def __init__(self, host, port, user, passWord):
        """
        ftp 连接,登陆  

        @param host 地址  
        @param port 端口  
        @param user 用户名  
        @param passWord 密码  
        """
        ftp = ftplib.FTP()
        timeOut = 5
        try:
            ftp.connect(host, port, timeOut)
            ftp.login(user, passWord)
            print(ftp.getwelcome())  # 打印出欢迎信息
        except Exception as e:
            print(u'=====> 创建 ftp 异常: ' + str(e))
            pass
        self._ftp = ftp

        self._count = 0

    def ftpUpload(self, localPath, remotePath, cb=None):
        '''
        ftp 上传文件  

        @param localPath 本地文件  
        @param remotePath 远程地址  
        '''
        self._uploadCb = cb
        bufsize = 1024  # 设置缓存区大小
        fp = open(localPath, 'rb')  # 读取本地文件
        self._ftp.storbinary('STOR ' + remotePath, fp, bufsize, cb)  # 上传文件
        self._ftp.set_debuglevel(0)

    def ftpDownload(self, remotePath, localPath, cb=None):
        """
        ftp 下载文件  

        @param remotePath 远程地址  
        @param localPath 本地文件  
        """
        self._downloadCb = cb
        bufsize = 1024  # 设置缓冲块大小
        fp = open(localPath, 'wb')  # 以写模式在本地打开文件
        self._ftp.retrbinary('RETR ' + remotePath, fp.write,
                             bufsize)  # 接收服务器上文件并写入本地文件
        self._ftp.set_debuglevel(0)  # 关闭调试

    def ftpUploadCB(self, p1, p2):
        """
        下载回调

        @param p1 当前进度大小  
        @param p2 总进度大小  
        """
        print(u'=====> 上传回调: {}k/{}k'.format(str(p1/1024), str(p2/1024)))
        if (self._uploadCb):
            self._uploadCb(p1, p2)
        pass

    def ftpDownloadCB(self, p1, p2):
        """
        下载回调

        @param p1 当前进度大小  
        @param p2 总进度大小  
        """
        print(u'=====> 下载回调: {}k/{}k'.format(str(p1/1024), str(p2/1024)))
        if (self._downloadCb):
            self._downloadCb(p1, p2)
        pass

    def ftpClose(self):
        self._ftp.close()


class SFTPTool(object):
    """
    sftp 传输工具

    @param host 地址  
    @param port 端口  
    @param user 用户名  
    @param passWord 密码  
    """
    _sftpClient = None  # sshClient

    _uploadCb = None  # 上传回调
    _downloadCb = None  # 下载回调

    def __init__(self, host, port, user, password):
        """
        构造函数，初始化

        @param host 地址  
        @param port 端口  
        @param user 用户名  
        @param passWord 密码  
        """
        try:
            client = paramiko.SSHClient()  # 获取SSHClient实例
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(host, username=user,
                           password=password)  # 连接SSH服务端

            self._sftpClient = client

            # print(sftp.getwelcome())  # 打印出欢迎信息
        except Exception as err:
            print(u'=====> 创建sftp 异常: ' + str(err))
            pass

        self._count = 0  # 回调计数用

    def sftpUpload(self, localPath, remotePath,  cb=None):
        """
        sftp 上传文件  

        @param localPath 本地文件  
        @param remotePath 远程地址  
        @param cb 上传回调  
        """
        self._uploadCb = cb
        try:
            transport = self._sftpClient.get_transport()  # 获取Transport实例
            # # 创建sftp对象，SFTPClient是定义怎么传输文件、怎么交互文件
            sftp = paramiko.SFTPClient.from_transport(
                transport)  # 如果连接需要密钥，则要加上一个参数，hostkey="密钥"
            # 将本地的 localPath 上传至服务器 remotePath
            sftp.put(localPath, remotePath, callback=self.sftpUploadCB)
        except Exception as err:
            print(u'=====> sftp upload 异常: ' + str(err))
            pass

    def sftpDownload(self, remotePath, localPath, cb=None):
        """
        sftp 上传文件  

        @param remotePath 远程地址  
        @param localPath 本地文件  
        @param cb 下载回调  
        """
        self._downloadCb = cb
        try:
            transport = self._sftpClient.get_transport()  # 获取Transport实例
            transport.set_keepalive(30)
            # # 创建sftp对象，SFTPClient是定义怎么传输文件、怎么交互文件
            sftp = paramiko.SFTPClient.from_transport(
                transport)  # 如果连接需要密钥，则要加上一个参数，hostkey="密钥"
            # 将本地的 localPath 上传至服务器 remotePath
            sftp.get(remotePath, localPath, callback=self.sftpDownloadCB)
        except Exception as err:
            print(u'=====> sftp Download 异常: ' + str(err))
            pass

    def sftpUploadCB(self, p1, p2):
        """
        下载回调

        @param p1 当前进度大小  
        @param p2 总进度大小  
        """
        if self._count % 100 == 0 or p1 == p2:
            # print(u'=====> 上传回调: {}k/{}k'.format(str(p1/1024), str(p2/1024)))
            if (self._uploadCb):
                self._uploadCb(p1, p2)
        self._count += 1
        pass

    def sftpDownloadCB(self, p1, p2):
        """
        下载回调

        @param p1 当前进度大小  
        @param p2 总进度大小  
        """
        print(u'=====> 下载回调: {}k/{}k'.format(str(p1/1024), str(p2/1024)))
        if (self._downloadCb):
            self._downloadCb(p1, p2)
        pass

    def sftpExecCMD(self, cmd):
        """
        sftp 执行命令  

        """
        print(u'=====> ssh 远程命令: ' + cmd)
        try:
            stdin, stdout, stderr = self._sftpClient.exec_command(cmd)
            out = stdout.readlines()    # 执行结果,readlines会返回列表
            # 执行状态,0表示成功，1表示失败
            channel = stdout.channel
            status = channel.recv_exit_status()
            print('status:{}'.format(status))
            if (status != 0):
                print(u'=====> ！！！！！exec cmd fail:' + str(status))
            return out, status
        except Exception as err:
            print(u'=====> sftp sftpExecCMD 异常: ' + str(err))
            pass

    def sftpClose(self):
        self._sftpClient.close()


# if __name__ == "__main__":
#     # setNetProxy(DX_PROXY, DX_PROXY_PORT, DX_USER, DX_PASSWORD)
#     # ftp = ftpConnect(HOST, PORT, USER, PASSWORD)
#     # print('=====>'+str(ftp))
#     remote = '/mydata/client/statics/html5/serverstate.json'
#     local = '../../test.json'

#     remote1 = '/mydata/client/statics/test11.zip'
#     local1 = 'dev.zip'
#     # ftpDownload(ftp, remote, local)
#     # ftpUpload(ftp, remote1, local1)

#     remote2 = '/mydata/client/html5/LYLTD-sun/index.html'
#     local2 = 'I:/'

#     # client = sftpConnect(HOST, PORT, USER, PASSWORD)
#     # sftpUpload(client, remote1, local1)

#     # 解压文件
#     cmd = 'unzip ' + remote1 + ' -d /mydata/client/statics/ttt'
#     # sftpExecCMD(client, cmd)
#     # sftpClose(client)

#     tool = SFTPTool(HOST, PORT, USER, PASSWORD)
#     tool.sftpDownload(remote2, local2)
#     # tool.sftpUpload(remote1, local1)
#     # tool.sftpExecCMD(cmd)
#     tool.sftpClose()

#     pass
