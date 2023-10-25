/*
 * @Author: Abel Chan
 * @Date: 2020-08-24 23:40:39
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-25 22:35:51
 * @FilePath: \assets\script\UI\panel\WordPanel.ts
 * @description: 
 */

import { _decorator, Component, Node, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

import { WordData } from "../controller/playGame/WordData";
import GameNodePool from "../pool/GameNodePool";
import { ACGLog } from "../../acgframework/log/ACGLog";
import { FillWordItem } from "./FillWordItem";

@ccclass('WordPanel')
export default class WordPanel extends Component {
    @property([Node])
    wordParentNodes: Node[] = [];
    private TAG = "WordPanel";
    private readonly _cellNum: number = 6;
    private _onWordClickCallback: (data: WordData) => void = null;
    onLoad() {

    }
    start() {

    }
    // update (dt) {}

    setWords(words: WordData[]) {
        for (let i = 0, len = words.length; i < len; i++) {
            let word = words[i];
            let parentNode = this.wordParentNodes[word.index];
            let node = parentNode.children[0]
            if (!node || !node.getComponent(FillWordItem)) {
                node = GameNodePool.getFreeWordNode(word);
                node.parent = this.wordParentNodes[word.index];
            }
            node.active = true;
            let component = node.getComponent(FillWordItem);
            component.setBtnClickCallback(this.selectGameWord.bind(this));
        }
    }
    public setClickWordCallback(cb: (data: WordData) => void) {
        this._onWordClickCallback = cb;
    }


    private selectGameWord(data: WordData) {
        ACGLog.debug(this.TAG, `onBtnClick selectGameWord ${data.word}`);
        this._onWordClickCallback && this._onWordClickCallback(data);
    }
}

