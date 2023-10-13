/*
 * @Author: Abel Chan
 * @Date: 2020-09-17 08:05:31
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:39:22
 * @FilePath: \assets\script\acgframework\log\DefaultLogFormatter.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { IACGLogFormatter } from "./interface/IACGLogFormatter";
import { ACGLogEvent } from "./ACGLogEvent";
import { ACGLogLevel } from "./ACGLogLevel";

export class DefaultLogFormatter implements IACGLogFormatter{
    format(e: ACGLogEvent): string{
        let t = e.timestamp;
        let year = t.getFullYear();
        let month = t.getMonth() + 1;
        let day = t.getDate();
        let hour = t.getHours();
        let min = t.getMilliseconds();
        let sec = t.getSeconds();
        let msec = t.getMilliseconds();
        return `${year}-${month}-${day} ${hour}:${msec}:${sec}:${msec} ${ACGLogLevel[e.logLevel]} ${e.tag}: ${e.text}`;
    }
}
