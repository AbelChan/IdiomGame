/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:00:55
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-06-23 01:36:05
 * @FilePath: d:\workSpace\gameFramework\GameFramework_MVC\assets\script\MVC\interface\IModel.ts
 * @description: IModel
 */
import { INotification } from "./INotification";

 

 
export interface IModel {

    
    //通知观察者
    notifyObservers( notification: INotification ): void; 
    
}
