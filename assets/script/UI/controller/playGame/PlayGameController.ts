/*
 * @Author: Abel Chan
 * @Date: 2020-07-29 21:39:56
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-30 07:44:32
 * @FilePath: \assets\script\UI\controller\playGame\PlayGameController.ts
 * @description: 
 */

import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import { BaseController } from "../../MVC/core/BaseController";
import { GameProfile } from "../../../profile/GameProfile";
import { StageProfile, StageWordItem } from "../../../profile/StageProfile";
import { TableEnum } from "../../../Infrastructure/LocalData/TableEnum";
import StageTable from "../../../Infrastructure/LocalData/StageTable";
import { WordData, WORD_STATE, WORD_TYPE } from "./WordData";
import GameFacade from "../../../Application/GameFacade";

@ccclass('PlayGameController')
export class PlayGameController extends BaseController {
    private _profile: StageProfile = null;
    private _stageId: number = 1;
    private _battleWords: WordData[] = [];
    private _freeWords: WordData[] = [];

    onLoad() {

    }

    start() {

    }

    loadProfile(profile: GameProfile) {
        super.loadProfile(profile);
        this._profile = profile.stage;
        this.setStage(this._profile.stageId ? this._profile.stageId : 1);
    }
    public setStage(stageId: number) {
        this._stageId = stageId;
        if (this._profile.stageId === stageId) {
            this.setupWordDataByProfile(this._profile);
        } else {
            let stageTable: StageTable = GameFacade.inst.tableRes.getTableRes(TableEnum.Stage, stageId) as StageTable;
            this.setupWordDataByStageTable(stageTable);
        }
    }
    get battleWords(): WordData[] {
        return this._battleWords;
    }
    get freeWords(): WordData[] {
        return this._freeWords;
    }

    private setupWordDataByProfile(profile: StageProfile) {
        this._battleWords = [];
        for (let i = 0, len = profile.battleWords.length - 1; i <= len; i++) {
            let item: StageWordItem = profile.battleWords[i] as StageWordItem;
            let wordData = new WordData();
            wordData.initWithProfile(item);
            this._battleWords.push(wordData);
        }

        this._freeWords = [];
        for (let i = 0, len = profile.freeWords.length - 1; i <= len; i++) {
            let item: StageWordItem = profile.freeWords[i] as StageWordItem;
            let wordData = new WordData();
            wordData.initWithProfile(item);
            this._freeWords.push(wordData);
        }
    }
    private setupWordDataByStageTable(table: StageTable) {
        let words = table.word;
        let answer = table.answer;
        this._battleWords = [];
        this._freeWords = [];

        let freeIndex = 0;
        for (let i = 0, len = words.length - 1; i <= len; i++) {
            let wordData = new WordData();
            let word = words[i];
            let pos = table.getWordPos(i);
            wordData.initWithStageTable(word, pos[0] * 10 + pos[1], pos);
            wordData.wordState = WORD_STATE.NORMAL;
            if (answer.indexOf(i) !== -1) {
                wordData.wordState = WORD_STATE.EMPTY;
                let freeWordData = new WordData();
                freeWordData.initWithStageTable(word, freeIndex++, pos);
                freeWordData.wordState = WORD_STATE.NORMAL;
                this._freeWords.push(freeWordData);
            }
            this._battleWords.push(wordData);
        }
    }
    private writeProfile() {
        this._profile.stageId = this._stageId;
        this._profile.battleWords = this._battleWords;
        this._profile.freeWords = this._freeWords;
        GameFacade.inst.saveProfile();
    }

}
