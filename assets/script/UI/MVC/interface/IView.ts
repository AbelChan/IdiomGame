/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:00:55
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-06-23 01:35:15
 * @FilePath: d:\workSpace\gameFramework\GameFramework_MVC\assets\script\MVC\interface\IView.ts
 * @description: IView
 */
import { IObserver } from "./IObserver";
import { INotification } from "./INotification";

 



export interface IView {
    //注册观察者
    registerObserver(notificationName: string, observer: IObserver): void;
    
    //注销观察者
    removeObserver(notificationName: string, notifyContext: any): void;

    //通知观察者
    notifyObservers( notification: INotification ): void; 
}