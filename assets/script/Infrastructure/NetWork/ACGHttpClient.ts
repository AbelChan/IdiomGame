/*
 * @Author: Abel Chan
 * @Date: 2020-06-24 00:52:08
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-06-24 01:05:22
 * @FilePath: \assets\script\Infrastructure\NetWork\ACGHttpClient.ts
 * @description: 
 */

import { _decorator, sys } from 'cc';
import { JSB } from 'cc/env';
export default class ACGHttpClient {
    public get(url: string, cb: (err?: string, msg?: string) => void, isScriptGet?: boolean) {
        let self = this;
        if (!isScriptGet) {
            let xhr = self._createCORSRequest();
            xhr.onreadystatechange = () => {
                self.onLoaded(xhr, cb);
            };
            xhr.onerror = () => {
                cb("NET_WORK_ERROR");
            };
            xhr.timeout = 3000;
            xhr.ontimeout = () => {
                cb("NET_WORK_TIMEOUT");
            }
            xhr.open("GET", url, true);
            if ("withCredentials" in xhr && !this.isNativeIos()) {
                xhr.withCredentials = true;
            }
            xhr.send();
        } else {
            self._scriptGet(url, cb);
        }
    }
    public post(url: string, args, cb) {
        var self = this;
        var xhr = self._createCORSRequest();
        xhr.onreadystatechange = () => {
            self.onLoaded(xhr, cb);
        };
        xhr.onerror = (e) => {
            // var str="lengthComputable="+e.lengthComputable+"loaded="+e.loaded+";total="+e.total;
            // alert("onerror" +str);
            cb("NET_WORK_ERROR");
        };
        xhr.timeout = 8000;//超时时间,毫秒单位
        xhr.ontimeout = () => {
            cb("NET_WORK_TIMEOUT");
        };

        xhr.open("POST", url, true);

        if ("withCredentials" in xhr && !this.isNativeIos()) {
            xhr.withCredentials = true;
        }

        if (typeof args === "object") {
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            args = JSON.stringify(args);
        } else if (typeof args === "string") {
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        }

        //
        //if(url.indexOf("iosappstor")>=0){
        //    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");//缺少这句，后台无法获取参数
        //}
        //cc.log("request url: " + url);
        //cc.log("request args: " + args);
        xhr.send(args);
    }
    private _createCORSRequest() {
        var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
        if ("withCredentials" in xhr && !this.isNativeIos()) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.withCredentials = true;
        } else if (typeof XDomainRequest !== "undefined") {
            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
        }
        return xhr;
    }
    private _scriptGet(url: string, cb: () => void) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script["readyState"]) { //IE
            script["onreadystatechange"] = function () {
                if (script["readyState"] == "loaded" || script["readyState"] == "complete") {
                    script["onreadystatechange"] = null;
                    cb && cb();
                }
            };
        } else { //Others
            script.onload = function () {
                cb && cb();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    private onLoaded(xhr, cb: (err: string, msg?: string) => void) {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status <= 207) {
                var responseText = xhr.responseText;
                if (cb) cb(null, responseText);
            } else if (xhr.status !== 0) {
                if (cb) cb("NET_WORK_ERROR");
            }
        }
    }
    private isNativeIos() {
        return JSB && (sys.os === sys.OS.OSX || sys.os === sys.OS.IOS);
    }
}

