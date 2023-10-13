/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 01:07:35
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:35:33
 * @FilePath: \assets\script\acgframework\log\ACGBaseAppender.ts
 * @description: 基类 -- 日志输出器 
 */

import { _decorator } from 'cc';
import { ACGLogEvent } from "./ACGLogEvent";
import { IACGLogAppender } from "./interface/IACGLogAppender";
import { IACGLogFilter, ACGLogFilterOperation } from "./interface/IACGLogFilter";
import { IACGLogFormatter } from "./interface/IACGLogFormatter";

export class ACGBaseAppender implements IACGLogAppender{
    protected _formatter: IACGLogFormatter = null;
    protected _filters: IACGLogFilter[] = [];
    
   /**
    *绑定格式化器
    * @type {acglib.ILogFormatter}
    * @memberof BaseAppender
    */
    get formatter(): IACGLogFormatter{
        return this._formatter;
    }
    set formatter(formatter: IACGLogFormatter){
        this._formatter = formatter;
    }
    addFilter(filter: IACGLogFilter){
        this._filters.push(filter);
    }
    removeFilter(filter: IACGLogFilter){
        this._filters.splice(this._filters.indexOf(filter), 1);
    }
    append (e: ACGLogEvent): void {
        for(let i = 0; i < this._filters.length; i++){
        if(this._filters[i].doFilter(e) === ACGLogFilterOperation.DENY){
        return;
        }
        }
        this.print(this._formatter.format(e));
    }
    print (logStr: string){

    }
    
}
