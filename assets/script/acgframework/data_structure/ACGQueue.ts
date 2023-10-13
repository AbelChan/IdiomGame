/*
 * @Author: Abel Chan
 * @Date: 2020-07-23 22:57:18
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-01 10:26:55
 * @FilePath: \assets\script\acgframework\data_structure\ACGQueue.ts
 * @description: 数据结构 --- 队列
 */ 
// 普通队列
// 循环队列

import { _decorator } from 'cc';
interface IACGQueue<T> {
    size: number;               //队列长度
    maxSize: number;            //队列最长长度
    enqueue(elem: T): boolean;  //入列
    dequeue(): T;               //出列
    isEmpty(): boolean;         //空
    isFull(): boolean;          //满
    front(): T|undefined;       //队列头
}

export class ACGQueue<T> {
    protected _elems: T[] = [];
    protected _maxLength: number = 0;
    protected _length: number = 0;
    constructor(maxLength: number = Infinity){
        this._maxLength = maxLength;
    }
    get maxSize(): number{
        return this._maxLength;
    }
    get size(): number{
        return this._elems.length;
    }
    public enqueue(elem: T): boolean{
        if(this.isFull()){
        return false;
        }
        this._elems.push(elem);
        return true;
    }
    public dequeue(): T|undefined{
        if(this.isEmpty()){
        return undefined;
        }
        return this._elems.pop();
    }
    public isEmpty(): boolean{
        return this._elems.length === 0;
    }
    public isFull (): boolean {
        return this._elems.length === this._maxLength;
    }
    public front(): T| undefined{
        if(this.isEmpty()){
        return undefined;
        }
        return this._elems[this._elems.length - 1];
    }
}

export class ACGCircularQueue<T> {
    protected _elem: T[] = [];
    protected _head: number = -1;
    protected _tail: number = -1;
    protected _size: number = 0;
    constructor(maxLength: number = Infinity){
        this._size = maxLength;
        this._head = -1;
        this._tail = -1;
    }
    get size(): number{
        if(this._head === -1){
        return 0;
        }else if(this._head <= this._tail){
        return this._tail - this._head + 1;
        }else{
        return (this._size - this._head) + this._tail + 1;
        }
    }
    get maxSize(): number{
        return this._size;
    }
    public enQueue(val: T){
        if(this.isFull()){
        return false;
        }

        if(this.isEmpty()){
        this._head = 0;
        }
        this._tail = (this._tail + 1)%this._size;
        this._elem[this._tail] = val;

        return true;
    }
    public deQueue(): T|undefined{
        if(this.isEmpty()){
        return undefined;
        }
        if(this._head === this._tail){
        this._head = this._tail = -1;
        return undefined;
        }
        let head = this._head;
        this._head = (this._head + 1)%this._size;

        return this._elem[head];
    }
    public front(): T{
        if(this.isEmpty()){
        return undefined;
        }
        return this._elem[this._head];
    }
    public isFull(): boolean{
        return ((this._tail + 1)%this._size) === this._head;
    }
    public isEmpty(): boolean{
        return this._head === -1;
    }
}

