/*
 * @Author: Abel Chan
 * @Date: 2020-07-12 16:49:53
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-08-27 00:12:09
 * @FilePath: \assets\script\UI\mediator\PlayGameMediator.ts
 * @description: 
 */

import { _decorator } from 'cc';
import BaseMediator from "../MVC/core/BaseMediator";
import { ViewType } from "../MVC/ViewType";
import { PlayGameController } from "../controller/playGame/PlayGameController";
import PlayGamePanel from "../panel/PlayGamePanel";
import UIManager from "../../Infrastructure/UIManager";
import { WordData } from '../controller/playGame/WordData';
import { FillWordData } from '../controller/playGame/FillWordData';

export default class PlayGameMediator extends BaseMediator implements IMediator {
    private _playGameController: PlayGameController;
    private _selectIndex: number = 0;
    onLoad() {
        super.onLoad();
        this.viewType = ViewType.Panel;
        this.prefabsRes = "prefabes/PlayGamePanel";
    }

    start() {
        super.start();

    }

    get controller(): PlayGameController {
        if (!this._playGameController) {
            this._playGameController = UIManager.inst.getComponent(PlayGameController);
        }
        return this._playGameController;
    }

    refreshView(data: any) {
        super.refreshView(data);
        let battleWords = this.controller.battleWords;
        let freeWords = this.controller.freeWords;


        let panel: PlayGamePanel = this.panel as PlayGamePanel;
        panel.setWords(battleWords, freeWords);
    }


    selectFillWord(data: FillWordData) {
        let playGameControler: PlayGameController = UIManager.inst.getComponent(PlayGameController);
        let word = data.word;
        this.controller.getWordData(this._selectIndex);
    }

    selectIdiomWord(data: WordData) {
        let playGameControler: PlayGameController = UIManager.inst.getComponent(PlayGameController);

    }


}
