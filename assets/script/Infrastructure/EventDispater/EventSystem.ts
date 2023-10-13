/*
 * @Author: Abel Chan
 * @Date: 2020-07-14 07:26:14
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-07-23 22:44:42
 * @FilePath: \assets\script\Infrastructure\EventDispater\EventSystem.ts
 * @description: 
 */ 

import { _decorator } from 'cc';
export class EventSystem {
     _events: Map<string, Function[]> = new Map();
     _addEvents: Map<string, Function[]> = new Map();
     _removeEvents: Map<string, Function[]> = new Map();
     _dispatcherCount: number = 0;
     registerEvent(eventName: string, callback: Function){
        if(this._dispatcherCount === 0){
        let funces = this._events.get(eventName);
        if(funces){
        funces.push(callback);
        }else{
        this._events.set(eventName, [callback]);
        }
        }else{
        let funces = this._addEvents.get(eventName);
        if(funces){
        funces.push(callback);
        }else{
        this._addEvents.set(eventName, [callback]);
        }
        }
     }
     unRegisterEvent(eventName: string, callback: Function){
        if(this._dispatcherCount === 0){
        let funces = this._events.get(eventName);
        if(funces){
        let isExist = false;
        for(let i = 0,len = funces.length; i < len; i++){
        if(funces[i] === callback){
        isExist = true;
        funces.splice(i,1);
        break;
        }
        }
        if(!isExist){
                   //TODO
        }
        }else{
               //TODO
        }
        }else{
        let funces = this._removeEvents.get(eventName);
        if(funces){
        funces.push(callback);
        }else{
        this._removeEvents.set(eventName, [callback]);
        }
        }
     }
     clearAddEvents(){
        if(this._dispatcherCount !== 0){
        return;
        }

        this._addEvents.forEach((value: Function[], key: string) => {
        let eventArr = this._events.get(key);
        eventArr = eventArr.concat(value);
        this._events.set(key, eventArr);
        });
        this._addEvents.clear();
     }
     clearRemoveEvents(){
        if(this._dispatcherCount !== 0){
        return;
        }

        this._removeEvents.forEach((value: Function[], key: string) => {
        let eventArr = this._events.get(key);
        for(let len = value.length - 1; len >= 0; len --){
        let callback = value[len];
        for(let eventLen = eventArr.length - 1; eventLen >= 0; eventLen--){
        if(callback === eventArr[eventLen]){
        eventArr.splice(eventLen, 1);
        break;
        }
        }
        }

        });
        this._removeEvents.clear();
     }
     dispatchEvent (eventName: string , data: any) {

        this.clearAddEvents();
        this.clearRemoveEvents();

        this._dispatcherCount += 1;
        let eventArr = this._events.get(eventName);
        for(let i = 0,len = eventArr.length; i < len; i++){
        let callback = eventArr[i];
        callback(data);
        }
        this._dispatcherCount -= 1;

        this.clearAddEvents();
        this.clearRemoveEvents();
     }
}

export class EventManager {
     private static _mainEventSystem: EventSystem;
    static getMainEventSystem():EventSystem {
        if(!EventManager._mainEventSystem){
        EventManager._mainEventSystem = new EventSystem();
        }
        return EventManager._mainEventSystem;
    }
}
