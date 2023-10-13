/*
 * @Author: Abel Chan
 * @Date: 2020-09-16 00:10:31
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-17 07:52:33
 * @FilePath: \assets\script\acgframework\event\EventEmitter.ts
 * @description: 事件派发器
 */

import { _decorator } from 'cc';
export class EventEmitter{
    protected listenerMap_:{[index: string]: EventListener[]} = {};
   /**
    * 添加一个事件监听器.
    * @param eventId 
    * @param listener 
    */
    addListener(eventId: string, listener: EventListener): EventListener{
        let listeners = this.listenerMap_[eventId];
        if(listeners){
        listeners.push(listener);
        }else{
        this.listenerMap_[eventId] = [listener];
        }
        return listener;
    }
    removeListener(eventId: string, listener: EventListener){
        let listeners = this.listenerMap_[eventId];
        if(listeners){
        return listeners.splice(listeners.indexOf(listener), 1);
        }
    }
}

