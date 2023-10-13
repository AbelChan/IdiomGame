/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 01:07:04
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:40:38
 * @FilePath: \assets\script\acgframework\log\interface\IACGLogFormatter.ts
 * @description: 接口 -- 日志格式化器
 */
import { ACGLogEvent } from "../ACGLogEvent";

  


export interface IACGLogFormatter{
    format(e: ACGLogEvent): string;
}