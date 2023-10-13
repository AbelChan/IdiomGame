/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 01:07:18
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:41:03
 * @FilePath: \assets\script\acgframework\log\interface\IACGLogger.ts
 * @description: 
 */
import { ACGLogLevel } from "../ACGLogLevel";
import { IACGLogAppender } from "./IACGLogAppender";

 

export interface IACGLogger {

    setLogLevel(logLevel: ACGLogLevel): void;
    getLogLevel(): ACGLogLevel;

    addAppender(appender: IACGLogAppender): void;
    removeAppender(appender: IACGLogAppender): void;

    log(logLevel: ACGLogLevel, tag: string, text: string): void;
}