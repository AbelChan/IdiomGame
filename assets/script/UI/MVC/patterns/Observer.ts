/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:13:07
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-07-14 00:51:48
 * @FilePath: \assets\script\UI\MVC\patterns\Observer.ts
 * @description: 
 */ 

import { _decorator } from 'cc';
import { IObserver } from "../interface/IObserver";
import { INotification } from "../interface/INotification";

export default class Observer implements IObserver{
    private notify: Function = null;
    private context: any = null;
    setNotifyMethod(notifyMethod: Function): void {
        this.notify = notifyMethod;
    }
    getNotifyMethod(): Function{
        return this.notify;
    }
    
    setNotifyContext(notifyContext: any): void {
        this.context = notifyContext;
    }
    getNotifyContext(): any {
        return this.context;
    }
    notifyObserver(notification: INotification): void {
        this.notify.call(this.context, notification);
    }
    compareNotifyContext(object: any): boolean {
        return object === this.context;
    }
    
}
