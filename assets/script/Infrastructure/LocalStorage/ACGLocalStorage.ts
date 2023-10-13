/*
 * @Author: Abel Chan
 * @Date: 2020-06-24 00:51:36
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-06-24 01:03:27
 * @FilePath: \assets\script\Infrastructure\LocalStorage\ACGLocalStorage.ts
 * @description: 
 */ 

import { _decorator, sys } from 'cc';
export default class ACGLocalStorage{
  
    static setItem (key: string, value: string){
        sys.localStorage.setItem(key, value);
    }
    static getItem (key: string): string{
        return sys.localStorage.getItem(key);
    }
    static removeItem(key: string) {
        sys.localStorage.removeItem(key);
    }
}

