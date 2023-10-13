/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:13:07
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-14 23:04:53
 * @FilePath: \assets\script\UI\MVC\patterns\Notifier.ts
 * @description: 
 */

import { _decorator } from 'cc';
import GameFacade from "../../../Application/GameFacade";
import { INotifier } from "../interface/INotifier";
import NotificationFace from "../../../Application/NotificationFacade";

export default class Notifier implements INotifier {
    sendNotification(name: string, body?: any, type?: string): void {
        if(this.facade()){
        this.facade().sendNotification(name, body, type);
        }
    }
    facade(): NotificationFace{
        return GameFacade.inst.NotificationFacade;
    }
}

