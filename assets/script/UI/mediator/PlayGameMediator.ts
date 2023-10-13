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

export default class PlayGameMediator extends BaseMediator implements IMediator{
    onLoad () {
        super.onLoad();
        this.viewType = ViewType.Panel;
        this.prefabsRes = "prefabes/battleScene";
    }
    start () {
        super.start();

    }
    refreshView(data: any){
        super.refreshView(data);
        let playGameControler: PlayGameController = UIManager.inst.getComponent(PlayGameController);
        let battleWords = playGameControler.battleWords;
        let freeWords = playGameControler.freeWords;


        let panel: PlayGamePanel = this.panel as PlayGamePanel;
        panel.setWords(battleWords, freeWords);
    }
}
