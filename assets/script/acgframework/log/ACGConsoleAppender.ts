/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 23:20:03
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:35:57
 * @FilePath: \assets\script\acgframework\log\ACGConsoleAppender.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { ACGBaseAppender } from "./ACGBaseAppender";
import { DefaultLogFormatter } from "./DefaultLogFormatter";

export class ACGConsoleAppender extends ACGBaseAppender{
    constructor(){
        super();
        this.formatter = new DefaultLogFormatter();
    }
    print(logStr: string){
        console.log(logStr);
    }
}
