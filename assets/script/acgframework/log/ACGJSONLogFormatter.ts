/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 22:46:56
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:36:17
 * @FilePath: \assets\script\acgframework\log\ACGJSONLogFormatter.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { IACGLogFormatter } from "./interface/IACGLogFormatter";
import { ACGLogEvent } from "./ACGLogEvent";

export class ACGJSONLogFormatter implements IACGLogFormatter {
   /**
//     * 格式化日志
//     * 时间（yyyy-mm-dd hh::mm::ss ssss） 级别  标签  正文
//     * @param e 
//     */
    format(e: ACGLogEvent): string {
        return JSON.stringify(e);
    }
}

