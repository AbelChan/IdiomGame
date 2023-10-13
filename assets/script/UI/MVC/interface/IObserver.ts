/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:14:14
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-07-14 00:57:04
 * @FilePath: \assets\script\UI\MVC\interface\IObserver.ts
 * @description: IObserver 观察者
 */
import { INotification } from "./INotification";

 


export interface IObserver {
    
    setNotifyMethod(notifyMethod: Function): void;
    getNotifyMethod(): Function;

    setNotifyContext(notifyContext: any): void;
    getNotifyContext(): any;

    notifyObserver(notification: INotification): void;

    compareNotifyContext(object: any): boolean;
}