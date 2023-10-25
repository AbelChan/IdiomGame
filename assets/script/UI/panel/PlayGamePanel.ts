/*
 * @Author: Abel Chan
 * @Date: 2020-07-21 07:17:18
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-08-25 00:04:43
 * @FilePath: \assets\script\UI\panel\PlayGamePanel.ts
 * @description: 
 */

import { _decorator, Label } from 'cc';
const { ccclass, property } = _decorator;

import BasePanel from "../MVC/core/BasePanel";
import { WordData } from "../controller/playGame/WordData";
import IdiomWidget from "./IdiomWidget";
import WordPanel from "./WordPanel";
import PlayGameMediator from "../mediator/PlayGameMediator";

@ccclass('PlayGamePanel')
export default class PlayGamePanel extends BasePanel {
    @property(IdiomWidget)
    private idiomPanel: IdiomWidget = null;
    @property(WordPanel)
    private wordPanel: WordPanel = null;
    @property(Label)
    numStageLabel: Label | null = null;

    onLoad() {

    }

    start() {

    }

    // update (dt) {}

    public setWords(battleWords: WordData[], fillWords: WordData[]) {
        this.idiomPanel.setWords(battleWords);
        this.idiomPanel.setClickWordCallback(this.onSelectIdiomWord.bind(this));
        this.wordPanel.setWords(fillWords);
        this.wordPanel.setClickWordCallback(this.onSelectFillWord.bind(this));
    }

    // private backHome() {
    //     EventManager.getMainEventSystem().dispatchEvent(EventName.HIDE_PANEL, PlayGameMediator);
    // }

    private onItemBtnClick() {

    }

    private onHelpBtnClick() {

    }

    private onRestartBtnClick() {

    }

    private onSelectFillWord(data: WordData) {
        (this.mediator as PlayGameMediator).selectFillWord(data);
    }

    private onSelectIdiomWord(data: WordData) {
        (this.mediator as PlayGameMediator).selectIdiomWord(data);
    }
}

