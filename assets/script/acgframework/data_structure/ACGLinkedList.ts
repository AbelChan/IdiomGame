/*
 * @Author: Abel Chan
 * @Date: 2020-07-23 22:59:09
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:33:40
 * @FilePath: \assets\script\acgframework\data_structure\ACGLinkedList.ts
 * @description: 数据结构 --- 链表
 */ 

import { _decorator } from 'cc';
export class ACGLinkedListEnumerator <T>{
    private _data: T;
    private _prev: ACGLinkedListEnumerator<T>;
    private _next: ACGLinkedListEnumerator<T>;
    constructor(data: T){
        this._data = data;
    }
    get data(): T{
        return this._data;
    }
    set data(val: T){
        this._data = val;
    }
    get prev(): ACGLinkedListEnumerator<T>{
        return this._prev;
    }
    set prev(val: ACGLinkedListEnumerator<T>){
        this._prev = val;
    }
    get next(): ACGLinkedListEnumerator<T>{
        return this._next;
    }
    set next(val: ACGLinkedListEnumerator<T>){
        this._next = val;
    }
}

export class ACGLinkedList <T>{
   private _head: ACGLinkedListEnumerator<T>;
   private _tail: ACGLinkedListEnumerator<T>;
   private _length: number = 0;
   constructor(){
        this._head = new ACGLinkedListEnumerator<T>(undefined);
        this._tail = new ACGLinkedListEnumerator<T>(undefined);
        this._head.next = this._tail;
        this._tail.prev = this._head;
   }
   get first(): ACGLinkedListEnumerator<T>{
        return this._head.next;
   }
   get last(): ACGLinkedListEnumerator<T>{
        return this._tail.prev;
   }
   get head(){
        return this._head;
   }
   get tail(){
        return this._tail;
   }
//   pushFront(data: T): ACGLinkedListEnumerator<T>{
       
//   }
}
