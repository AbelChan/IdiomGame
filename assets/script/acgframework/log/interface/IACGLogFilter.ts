/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 01:06:44
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:40:26
 * @FilePath: \assets\script\acgframework\log\interface\IACGLogFilter.ts
 * @description: 接口 -- 日志过滤器
 */

import { ACGLogEvent } from "../ACGLogEvent";

 


export enum ACGLogFilterOperation{
    ACCEPT,
    DENY,
}

export interface IACGLogFilter {
    doFilter(e: ACGLogEvent): ACGLogFilterOperation;
}