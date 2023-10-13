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
    @property([Node])
    line0Nodes: Node[][] = [];
    @property([Node])
    line1Nodes: Node[] = [];
    @property([Node])
    line2Nodes: Node[] = [];
    @property([Node])
    line3Nodes: Node[] = [];
    @property([Node])
    line4Nodes: Node[] = [];
    @property([Node])
    line5Nodes: Node[] = [];
    @property([Node])
    line6Nodes: Node[] = [];
    @property([Node])
    line7Nodes: Node[] = [];
    @property([Node])
    line8Nodes: Node[] = [];

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

        for (let i = 0, len = words.length; i < len; i++) {
            let word = words[i];
            let index = word.index;
            let x = Math.ceil(index / 10);
            let y = index % 10;
            let node = GameNodePool.getBattleWordNode(word);
            let parentNode;
            if (y === 0) {
                parentNode = this.line0Nodes[x];
            } else if (y === 1) {
                parentNode = this.line1Nodes[x];
            } else if (y === 2) {
                parentNode = this.line2Nodes[x];
            } else if (y === 3) {
                parentNode = this.line3Nodes[x];
            } else if (y === 4) {
                parentNode = this.line4Nodes[x];
            } else if (y === 5) {
                parentNode = this.line5Nodes[x];
            } else if (y === 6) {
                parentNode = this.line6Nodes[x];
            } else if (y === 7) {
                parentNode = this.line7Nodes[x];
            } else if (y === 8) {
                parentNode = this.line8Nodes[x];
            }
            node.parent = parentNode;
            // node.setPosition(v3((2 * x - 1) / 2 * this._cellWidth - this._cellWidth * 4.5,
            //     (2 * y - 1) / 2 * this._cellHeight - this._cellHeight * 4.5));

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


