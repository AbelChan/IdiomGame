/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:01:16
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-22 00:34:25
 * @FilePath: \assets\script\UI\MVC\core\BaseView.ts
 * @description: View
 */

import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import GameFacade from "../../../Application/GameFacade";
import { INotification } from "../interface/INotification";
import { IObserver } from "../interface/IObserver";
import { IView } from "../interface/IView";
import NotificationFace from "../../../Application/NotificationFacade";

@ccclass('BaseView')
export default class BaseView extends Component implements IView {
    
   private observerMap: Object = null;
   // onLoad () {}
    start () {

    }
   // update (dt) {}
    public registerObserver(notificationName: string, observer: IObserver): void {

    }
    public removeObserver(notificationName: string, notifyContext: any): void {

    }
    
    public notifyObservers(notification: INotification): void {

    }
    public get notificationFace(): NotificationFace{
        return GameFacade.inst.NotificationFacade;
    }
    private showPanel () {

    }
    
    private hidePanel () {

    }
}

