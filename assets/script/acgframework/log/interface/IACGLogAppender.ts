/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 01:06:08
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:40:10
 * @FilePath: \assets\script\acgframework\log\interface\IACGLogAppender.ts
 * @description:  接口 -- 日志输出器
 */
import { ACGLogEvent } from "../ACGLogEvent";

 

export interface IACGLogAppender{
    append(e: ACGLogEvent): void;
}