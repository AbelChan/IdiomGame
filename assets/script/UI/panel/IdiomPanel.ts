/*
 * @Author: Abel Chan
 * @Date: 2020-08-24 23:32:00
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-15 23:37:13
 * @FilePath: \assets\script\UI\panel\IdiomPanel.ts
 * @description: 
 */

import { _decorator, Component, Node, UITransform, v3 } from 'cc';
const { ccclass, property } = _decorator;

import { WordData } from "../controller/playGame/WordData";
import GameNodePool from "../pool/GameNodePool";
import { ACGLog } from "../../acgframework/log/ACGLog";
import { GameWord } from "./GameWord";

@ccclass('IdiomPanel')
export default class IdiomPanel extends Component {
    @property(Node)
    private targetNode: Node | null = null;
    private TAG = "IdiomPanel"
    private static _cellNum: number = 9;
    private _cellWidth: number = 0;
    private _cellHeight: number = 0;
    private _onWordClickCallback: Function = null;
    onLoad() {
        let size = this.node.getComponent(UITransform);
        this._cellWidth = size.width / IdiomPanel._cellNum;
        this._cellHeight = size.height / IdiomPanel._cellNum;
    }
    start() {


    }
    // update (dt) {}
    setWords(words: WordData[]) {
        this.targetNode.destroyAllChildren();

        for (let i = 0, len = words.length; i < len; i++) {
            let word = words[i];
            let node = GameNodePool.getBattleWordNode(word);
            node.parent = this.node;
            let index = word.index;
            let x = Math.ceil(index / 10);
            let y = index % 10;
            let ix = Math.ceil(i / IdiomPanel._cellNum);
            let iy = i % IdiomPanel._cellNum;
            node.setPosition(v3((2 * x - 1) / 2 * this._cellWidth - this._cellWidth * 4.5,
                (2 * y - 1) / 2 * this._cellHeight - this._cellHeight * 4.5));

            let component = node.getComponent(GameWord);
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


