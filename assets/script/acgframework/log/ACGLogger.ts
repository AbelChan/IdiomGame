/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 22:50:25
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:42:50
 * @FilePath: \assets\script\acgframework\log\ACGLogger.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { ACGLogEvent } from "./ACGLogEvent";
import { ACGLogLevel } from "./ACGLogLevel";
import { IACGLogAppender } from "./interface/IACGLogAppender";
import { IACGLogger } from "./interface/IACGLogger";

export class ACGLogger implements IACGLogger{
    private _logLevel: ACGLogLevel = ACGLogLevel.INFO;
    private _appenders: IACGLogAppender[] = [];
   /**
    * 日志级别
    * @param logLevel 
    */
    setLogLevel(logLevel: ACGLogLevel): void {
        this._logLevel = logLevel;
    }
    getLogLevel(): ACGLogLevel {
        return this._logLevel;
    }
   /**
    * 设置日志接收器
    * @param appender 
    */
    addAppender(appender: IACGLogAppender): void {
        this._appenders.push(appender);
    }
   /**
    * 移除日志接收器
    * @param appender 
    */
    removeAppender(appender: IACGLogAppender): void {
        this._appenders.splice(this._appenders.indexOf(appender), 1);
    }
   /**
    * 日志输出
    * @param logLevel 
    * @param tag 
    * @param text 
    */
    log(logLevel: ACGLogLevel, tag: string, text: string): void {
        if(logLevel >= this._logLevel){
        let e = new ACGLogEvent(new Date(), logLevel, tag, text);
        this._appenders.forEach( (appender) => {
        appender.append(e);
        })
        }
    }
    
}

