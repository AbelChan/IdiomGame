/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 00:59:48
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:38:36
 * @FilePath: \assets\script\acgframework\log\ACGLogLevel.ts
 * @description: 日志等级
 */


export enum ACGLogLevel {
    ALL,    // 全部打开
    TRACE,  // 开发时跟踪用的信息
    DEBUG,  // 调试信息
    INFO,   // 一般信息
    WARN,   // 警告
    ERROR,  // 错误
    FATAL,  // 致命错误
    OFF,    // 全部关闭
}
