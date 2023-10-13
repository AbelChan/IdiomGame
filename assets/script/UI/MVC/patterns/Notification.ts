/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:13:57
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-07-14 00:32:34
 * @FilePath: \assets\script\UI\MVC\patterns\Notification.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { INotification } from "../interface/INotification";

export default class Notification implements INotification{
    private name: string = null;
    private body: any = null;
    private type: string = null;
    constructor(name: string, body: any = null, type: string = null){
        this.name = name;
        this.body = body;
        this.type = type;
    }
    
    getName(): string {        
        return this.name;
    }
    
    getBody() {
        return this.body;
    }
    
    getType(): string {
        return this.type;
    }
    toString(): string {
        return ;
    }
}

