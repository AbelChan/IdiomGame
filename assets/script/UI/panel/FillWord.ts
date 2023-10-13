/*
 * @Author: Abel Chan
 * @Date: 2020-07-29 01:20:57
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-25 22:34:35
 * @FilePath: \assets\script\UI\panel\FillWord.ts
 * @description: 
 */

import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

import { WordData } from "../controller/playGame/WordData";

@ccclass('FillWord')
export class FillWord extends Component {
    @property(Label)
    private label: Label | null = null;
    private _wordData: WordData = null;
    private _onBtnCallback: Function = null;
    onLoad() {

    }
    start() {

    }
    reuse(word: WordData) {
        this._wordData = word;
        this.string = word.word;
    }
    unuse() {

    }
    set string(val: string) {
        this.label.string = val;
    }
    public setBtnClickCallback(cb: Function) {
        this._onBtnCallback = cb;
    }
    private onBtnClick() {
        this._onBtnCallback && this._onBtnCallback(this._wordData);
    }
}

