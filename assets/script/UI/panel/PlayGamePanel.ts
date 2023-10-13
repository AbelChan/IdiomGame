/*
 * @Author: Abel Chan
 * @Date: 2020-07-21 07:17:18
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-08-25 00:04:43
 * @FilePath: \assets\script\UI\panel\PlayGamePanel.ts
 * @description: 
 */ 

import { _decorator, Label } from 'cc';
const {ccclass, property} = _decorator;

import { EventManager } from "../../Infrastructure/EventDispater/EventSystem";
import { EventName } from "../../Infrastructure/EventDispater/EventName";
import BasePanel from "../MVC/core/BasePanel";
import { WordData } from "../controller/playGame/WordData";
import IdiomPanel from "./IdiomPanel";
import WordPanel from "./WordPanel";
import PlayGameMediator from "../mediator/PlayGameMediator";

@ccclass('PlayGamePanel')
export default class PlayGamePanel extends BasePanel {
    @property(IdiomPanel)
    private idiomPanel: IdiomPanel = null;
    @property(WordPanel)
    private wordPanel: WordPanel = null;
    @property(Label)
    numStageLabel: Label | null = null;
    onLoad () {

    }
    start () {

    }
   // update (dt) {}
    public setWords(battleWords: WordData[], freeWords: WordData[]){
        this.idiomPanel.setWords(battleWords);
        this.wordPanel.setWords(freeWords);
    }
    private backHome (){
        EventManager.getMainEventSystem().dispatchEvent(EventName.HIDE_PANEL, PlayGameMediator);
    }
    private onItemBtnClick(){

    }
    private onHelpBtnClick () {

    }
    private onRestartBtnClick () {

    }
    private onSelectFillWord(data: WordData){
        EventManager.getMainEventSystem().dispatchEvent(EventName.PLAYGAME_PANEL_SELECT_FILLWORD, data);
    }
    private onSelectIdiomWord(data: WordData){
        EventManager.getMainEventSystem().dispatchEvent(EventName.PLAYGAME_PANEL_SELECT_IDIOMWORD, data);
    }
}

