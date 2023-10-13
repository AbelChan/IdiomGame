/*
 * @Author: Abel Chan
 * @Date: 2020-08-24 23:40:39
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-25 22:35:51
 * @FilePath: \assets\script\UI\panel\WordPanel.ts
 * @description: 
 */

import { _decorator, Component, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

import { WordData } from "../controller/playGame/WordData";
import GameNodePool from "../pool/GameNodePool";
import { ACGLog } from "../../acgframework/log/ACGLog";
import { FillWord } from "./FillWord";

@ccclass('WordPanel')
export default class WordPanel extends Component {
    private TAG = "WordPanel";
    private readonly _cellNum: number = 6;
    private _cellWidth: number = 0;
    private _cellHeight: number = 0;
    private _onWordClickCallback: (data: WordData) => void = null;
    onLoad() {
        let size = this.node.getComponent(UITransform);
        this._cellWidth = size.width / this._cellNum;
        this._cellHeight = size.height / 4;
    }
    start() {

    }
    // update (dt) {}

    setWords(words: WordData[]) {
        this.node.destroyAllChildren();
        for (let i = 0, len = words.length; i < len; i++) {
            let word = words[i];
            let node = GameNodePool.getFreeWordNode(word);
            node.parent = this.node;
            let index = word.index;
            let y = Math.floor(index / this._cellNum);
            let x = index % this._cellNum;
            node.setPosition(v3((2 * x + 1) / 2 * this._cellWidth - this._cellNum / 2 * this._cellWidth,
                -(2 * y + 1) / 2 * this._cellHeight))


            let component = node.getComponent(FillWord);
            component.setBtnClickCallback(this.selectGameWord.bind(this));
        }
    }
    private setClickWordCallback(cb: (data: WordData) => void) {
        this._onWordClickCallback = cb;
    }


    private selectGameWord(data: WordData) {
        ACGLog.debug(this.TAG, `onBtnClick selectGameWord ${data.word}`);
        this._onWordClickCallback && this._onWordClickCallback(data);
    }
}

