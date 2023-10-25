// /*
//  * @Author: Abel Chan
//  * @Date: 2020-07-23 22:59:09
//  * @LastEditors: Abel Chan
//  * @LastEditTime: 2020-10-01 10:26:47
//  * @FilePath: \assets\script\acgframework\data_structure\ACGStack.ts
//  * @description: 数据结构 --- 栈
//  */ 

import { _decorator } from 'cc';
interface IACGStack<T> {
    size: number;           // 栈size
    maxSize: number;        // 栈maxSize
    push(val: T): boolean;  // 入栈
    pop(): T | undefined;     // 出栈
    peek(): T | undefined;    // 栈头
    isEmpty(): boolean;     // 空
    isFull(): boolean;      // 满
}

export class ACGStack<T> {
    protected _elems: T[] = [];
    protected _maxLength: number = 5;
    constructor(maxLength: number = Infinity) {
        this._maxLength = maxLength;
    }

    get size(): number {
        return this._elems.length;
    }

    get maxSize(): number {
        return this._maxLength;
    }

    push(elem: T): boolean {
        if (this.isFull()) {
            return false;
        }
        this._elems.push(elem);
        return true;
    }

    pop(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this._elems.pop();
    }

    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this._elems[this._elems.length - 1];
    }

    isEmpty(): boolean {
        return this._elems.length === 0;
    }

    isFull(): boolean {
        return this._elems.length === this._maxLength;
    }

    clear() {
        this._elems = [];
    }
}
