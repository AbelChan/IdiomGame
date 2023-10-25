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

import { WORD_STATE, WordData } from "../controller/playGame/WordData";
import GameNodePool from "../pool/GameNodePool";
import { ACGLog } from "../../acgframework/log/ACGLog";
import { GameWordItem } from "./GameWordItem";

@ccclass('IdiomWidget')
export default class IdiomWidget extends Component {
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

    private TAG = "IdiomWidget"
    private _onWordClickCallback: Function = null;
    private _words: GameWordItem[] = [];
    
    onLoad() {
    }

    start() {


    }

    // update (dt) {}

    setWords(words: WordData[]) {
        this._words.length = 0;

        let selected: boolean = true;
        for (let i = 0, len = words.length; i < len; i++) {
            let word = words[i];
            let index = word.index;
            let x = Math.ceil(index / 10);
            let y = index % 10;
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
            let node = parentNode.children[0]
            if (!node || !node.getComponent(GameWordItem)) {
                node = GameNodePool.getBattleWordNode(word);
                node.parent = parentNode;
            }

            node.active = true;
            let component = node.getComponent(GameWordItem);
            component.setBtnClickCallback(this.selectGameWord.bind(this));
            if (word.wordState === WORD_STATE.EMPTY && selected) {
                component.selectImg.active = true;
                selected = false;
            }
            this._words[this._words.length] = component;
        }
    }

    public setClickWordCallback(cb: (data: WordData) => void) {
        this._onWordClickCallback = cb;
    }

    private selectGameWord(data: WordData) {
        ACGLog.debug(this.TAG, `onBtnClick selectGameWord ${data.word}`);
        this._onWordClickCallback && this._onWordClickCallback(data);
        if (data.wordState === WORD_STATE.FILL) {
            data.wordState = WORD_STATE.EMPTY;
        }
        for (let index = 0, len = this._words.length; index < len; ++index) {
            let element = this._words[index];
            element.setSelected(data);
        }
    }
}


