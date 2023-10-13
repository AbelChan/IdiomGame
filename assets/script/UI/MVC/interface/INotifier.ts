/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:14:14
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-22 00:51:14
 * @FilePath: \assets\script\UI\MVC\interface\INotifier.ts
 * @description: INotifier  广播者
 */ 



export interface INotifier{

    sendNotification( name:string, body?:any, type?:string ):void;
    
}