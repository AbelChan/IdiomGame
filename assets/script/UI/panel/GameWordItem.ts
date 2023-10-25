/*
 * @Author: Abel Chan
 * @Date: 2020-07-29 01:19:50
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-16 00:03:46
 * @FilePath: \assets\script\UI\panel\GameWordItem.ts
 * @description: 游戏区的字块
 */

import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

import { WordData, WORD_STATE } from "../controller/playGame/WordData";

@ccclass('GameWordItem')
export class GameWordItem extends Component {
    @property(Label)
    private label: Label | null = null;

    @property({ type: Node, tooltip: "完成状态图片" })
    completeImg: Node | null = null;
    @property({ type: Node, tooltip: "未完成状态图片" })
    unCompleteImg: Node | null = null;
    @property({ type: Node, tooltip: "空白状态图片" })
    emptyImg: Node | null = null;
    @property({ type: Node, tooltip: "选中光圈图片" })
    selectImg: Node | null = null;
    @property({ type: Node, tooltip: "可填充状态图片" })
    fillImg: Node | null = null;
    private _wordData: WordData = null;
    private _onBtnCallback: Function = null;

    onLoad() {
        let labelNode = this.node.getChildByName("wordLabel");
        this.label = labelNode.getComponent(Label);

    }

    start() {

    }

    reuse(val: WordData) {
        this._wordData = val;
        this.setLabelStr(val.word);
        this.setWordImg();
    }

    unuse() {
        this._wordData = null;
    }

    setSelected(val: WordData) {
        this.selectImg.active = this._wordData === val;
        this.setLabelStr(this._wordData.word);
    }

    refreshWord() {
        this.setLabelStr(this._wordData.word);
        this.setWordImg();
    }

    public setBtnClickCallback(cb: Function) {
        this._onBtnCallback = cb;
    }

    private setWordImg() {
        this.completeImg.active = this._wordData.wordState === WORD_STATE.COMPLETE;
        this.unCompleteImg.active = this._wordData.wordState === WORD_STATE.NORMAL;
        this.emptyImg.active = this._wordData.wordState === WORD_STATE.EMPTY;
        this.selectImg.active = false;
        this.fillImg.active = this._wordData.wordState === WORD_STATE.FILL || this._wordData.wordState === WORD_STATE.FILLFAIL;
    }

    private setLabelColor() {
        // this.label.node.color
        // color(255, 255, 255);    //完成状态
        // color(87, 70, 62);       //未完成状态和填词状态
        // color(203, 56, 66);      //填完失败
    }

    private setLabelStr(str: string) {
        this.label.string = str;
        this.label.node.active = this._wordData.wordState !== WORD_STATE.EMPTY;
    }

    private onBtnClick() {
        if (!this.selectImg.active && (this._wordData.wordState === WORD_STATE.EMPTY ||
            this._wordData.wordState === WORD_STATE.FILL ||
            this._wordData.wordState === WORD_STATE.FILLFAIL)) {
            this._onBtnCallback && this._onBtnCallback(this._wordData);
        }
    }
}
