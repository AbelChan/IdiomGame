/*
 * @Author: Abel Chan
 * @Date: 2020-06-24 01:32:10
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-14 07:20:30
 * @FilePath: \assets\script\Application\NotificationFacade.ts
 * @description: 
 */

import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import { IObserver } from "../UI/MVC/interface/IObserver";
import Notification from "../UI/MVC/patterns/Notification"

@ccclass('NotificationFacade')
export default class NotificationFacade extends Component {
    private observers: Map<string, IObserver[]>;
    registerObserver(name: string, observer: IObserver){
        let nameObservers = this.observers.get(name);
        if(!nameObservers){
        this.observers.set(name, [observer]);
        }else{
        let isExist = false;
        for(let i = 0,len = nameObservers.length; i < len; i++){
        if(observer === nameObservers[i]){
        isExist = true;
        break;
        }
        }

        if(!isExist){
        nameObservers.push(observer);
        }
        }
    }
    
    removeObserver(name: string, notifyContext:any){
        let nameObservers = this.observers.get(name);
        if(nameObservers){
        for(let len = nameObservers.length - 1; len > 0; len--){
        if(nameObservers[len].getNotifyContext() === notifyContext){
        nameObservers.splice(len, 1);
        }
        }
        }
    }
   // update (dt) {}
    sendNotification(name: string, body: any=null, type: string=null): void{
        let notification = new Notification(name, body, type);
        let nameObservers = this.observers.get(name);
        for(let i = 0,len = nameObservers.length; i < len; i++){
        let observer = nameObservers[i];
        observer.notifyObserver(notification);
        }
    }
}

