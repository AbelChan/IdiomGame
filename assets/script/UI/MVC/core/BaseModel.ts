/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:01:16
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-06-24 01:36:03
 * @FilePath: \assets\script\ui\MVC\core\BaseModel.ts
 * @description: 
 */

import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import { INotification } from "../interface/INotification";
import { IModel } from "../interface/IModel";

@ccclass('BaseModel')
export default class BaseModel extends Component implements IModel {
    
    notifyObservers(notification: INotification): void {
        throw new Error("Method not implemented.");
    }
   // onLoad () {}
    start () {

    }
   // update (dt) {}
}
