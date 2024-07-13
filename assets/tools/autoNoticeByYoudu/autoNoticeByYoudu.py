# coding: utf-8

import os
import requests
import argparse
# import jenkins
import time

# 客户端组 机器人
GROUP_ID = '133d0f19-f31e-4f7e-b75d-7baaf5d1fb95'

# p7 组 机器人 https://open.feishu.cn/open-apis/bot/v2/hook/e0854297-5f5e-4b68-ad25-6fe12637bff6
P7_Group = 'e0854297-5f5e-4b68-ad25-6fe12637bff6'

try:
    import jenkins
except ImportError:
    cmd = 'pip3 install python-jenkins'
    # if (IS_PY3):
    #     cmd = 'pip3 install jenkins'
    os.system(cmd)
    import jenkins
    pass

# 通知测试人员


def noticeTestMembers(pathName, strMsg):
    print('')

# 通知群


def noticeMemberGroup(pathName, strMsg):
    url = "https://open.feishu.cn/open-apis/bot/v2/hook/{}".format(P7_Group)
    params = {
        "msg_type": "post",
        "content": {
            "post": {
                "zh_cn": {
                    "title": pathName + "已更新",
                    "content": [
                        [
                            {
                                "tag": "text",
                                "text": strMsg
                            },
                            {
                                "tag": "at",
                                "user_id": "all",
                                "user_name": "所有人"
                            }
                        ]
                    ]
                }
            }
        }
    }
    res = requests.post(url=url, json=params)
    print(res.text)


def getBuildChanges(jenkinsUrl):
    jk = jenkins.Jenkins(url=jenkinsUrl, username="tree",
                         password="123456")
    devInfo = jk.get_info()
    firstBuildNum = devInfo["firstBuild"]["number"]
    lastBuildNum = devInfo["lastBuild"]["number"]
    lastSuccessBuildNum = devInfo["lastSuccessfulBuild"]["number"] or 0
    if lastSuccessBuildNum < firstBuildNum:
        lastSuccessBuildNum = firstBuildNum

    strMsg = ""
    msgIndex = 1
    buildIndex = lastSuccessBuildNum + 1
    desList = []
    while buildIndex <= lastBuildNum:
        jkv = jenkins.Jenkins(url=jenkinsUrl + "/" + str(buildIndex), username="tree",
                              password="123456")
        try:
            jkv_info = jkv.get_info()       
            itemList = jkv_info["changeSet"]['items']
        except jenkins.NotFoundException:
            continue
            pass
        for item in itemList:
            msg = item['msg']
            if msg not in desList:
                desList.append(msg)
                userName = ''
                # svn 名字这么取
                if 'user' in item:
                    userName = item['user']
                else:
                    # git名字这么取
                    userName = item['author']['fullName']
                    pass

                if msgIndex == 1:
                    strMsg += "修改内容如下:\n"

                timestamp = int(item['timestamp'] / 1000)
                timeArr = time.localtime(timestamp)
                strTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArr)
                strMsg += (str(msgIndex) + ": " + msg +
                           "(" + userName + "  " + strTime + ")\n")

            msgIndex += 1
        buildIndex += 1
    return strMsg


def main():
    Arg = argparse.ArgumentParser('Auto Notice params')
    Arg.add_argument('-nc', '--NOTICE_CONTENT', default='~')
    Arg.add_argument('-pathName', '--remote22Dir', default='~')
    Arg.add_argument('-gitLog', '--gitLog', default='')
    Arg.add_argument('-jenkinsUrl', '--JenkinsUrl',
                     default='http://192.168.0.100:8080/job/DGZ-B-dev/')

    args = Arg.parse_args()

    # 22同步路径
    pathName = args.remote22Dir
    #  目前没有用 参考 changelog-environment https://blog.csdn.net/hostel_2/article/details/125994928
    gitLog = args.gitLog
    # 通知内容
    nc = args.NOTICE_CONTENT

    # jenkins工程构建路径

    jenkinsUrl = args.JenkinsUrl

    strNc = "客户端地址：http://192.168.0.22:8888/html5_dgz/{}/?test=true&serverType=0&guide=false&userId=\n外网测试链接：http://p62-test-web.ssl.daxianghuyu.cn/{}/?test=true&serverType=1&guide=false&userId=\n".format(pathName, pathName)
    if nc != "~":
        strNc += ("概述：" + nc + "\n")

    strMsg = getBuildChanges(jenkinsUrl)
    noticeMemberGroup(pathName, strNc + strMsg)
    # noticeTestMembers(pathName, strNc + strMsg)


if __name__ == "__main__":
    main()
    # test 通知
    # noticeMemberGroup('test', 'just  test')
    pass
