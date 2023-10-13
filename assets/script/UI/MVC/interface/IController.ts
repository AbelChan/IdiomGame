/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:00:32
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-06-23 01:35:43
 * @FilePath: d:\workSpace\gameFramework\GameFramework_MVC\assets\script\MVC\interface\IController.ts
 * @description: 
 */
import { IObserver } from "./IObserver";

 


export interface IController{

    //注册观察者
    registerObserver(notificationName: string, observer: IObserver): void;
        
    //注销观察者
    removeObserver(notificationName: string, notifyContext: any): void;
    
}
