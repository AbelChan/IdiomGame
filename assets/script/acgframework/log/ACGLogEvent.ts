/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 01:02:47
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:41:46
 * @FilePath: \assets\script\acgframework\log\ACGLogEvent.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { ACGLogLevel } from "./ACGLogLevel";

export class ACGLogEvent{
    timestamp: Date;
    logLevel: ACGLogLevel = ACGLogLevel.INFO;
    tag: string = "";
    text: string = "";
    constructor(timestamp: Date, logLevel: ACGLogLevel, tag: string, text: string){
        this.timestamp = timestamp;
        this.logLevel = logLevel;
        this.tag = tag;
        this.text = text;
    }
}
