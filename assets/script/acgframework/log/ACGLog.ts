/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 22:49:30
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:37:06
 * @FilePath: \assets\script\acgframework\log\ACGLog.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { ACGLogLevel } from "./ACGLogLevel";
import { ACGLogger } from "./ACGLogger";

export class ACGLog{
    static _logger: ACGLogger = new ACGLogger();
    static get logger(){
        return ACGLog._logger;
    }
    static trace(tag: string, text: string){
        if(this._logger.getLogLevel() <= ACGLogLevel.TRACE){
        this._logger.log(ACGLogLevel.TRACE, tag, text);
        }
    }
    static debug(tag: string, text: string){
        if(this._logger.getLogLevel() <= ACGLogLevel.DEBUG){
        this._logger.log(ACGLogLevel.DEBUG, tag, text);
        }
    }
    static info(tag: string, text: string){
        if(this._logger.getLogLevel() <= ACGLogLevel.INFO){
        this._logger.log(ACGLogLevel.INFO, tag, text);
        }
    }
    static warn(tag: string, text: string){
        if(this._logger.getLogLevel() <= ACGLogLevel.WARN){
        this._logger.log(ACGLogLevel.WARN, tag, text);
        }
    }
    static error(tag: string, text: string){
        if(this._logger.getLogLevel() <= ACGLogLevel.ERROR){
        this._logger.log(ACGLogLevel.ERROR, tag, text);
        }
    }
    static fatal(tag: string, text: string){
        if(this._logger.getLogLevel() <= ACGLogLevel.FATAL){
        this._logger.log(ACGLogLevel.FATAL, tag, text);
        }
    }
}

