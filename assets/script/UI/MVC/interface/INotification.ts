/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:14:14
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-22 00:50:21
 * @FilePath: \assets\script\UI\MVC\interface\INotification.ts
 * @description: INotification  消息体
 */ 


export interface INotification{
    
    getName(): string;

    getBody(): any;

    getType(): string;

    toString(): string;

}