/*
 * @Author: Abel Chan
 * @Date: 2020-07-21 07:17:18
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-08 00:54:57
 * @FilePath: \assets\script\UI\panel\StartGamePanel.ts
 * @description: 
 */

import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

import { EventName } from "../../Infrastructure/EventDispater/EventName";
import PlayGameMediator from "../mediator/PlayGameMediator";
import BasePanel from "../MVC/core/BasePanel";
import CreateStageMediator from '../mediator/CreateStageMediator';

@ccclass('StartGamePanel')
export default class StartGamePanel extends BasePanel {

    // onLoad () {}
    start() {

    }
    // update (dt) {}
    gotoPlayGamePanel() {
        this._mediator.dispatchEvent(EventName.SHOW_PANEL, { view: PlayGameMediator });
    }

    gotoCreateStagePanel() {
        this._mediator.dispatchEvent(EventName.SHOW_PANEL, { view: CreateStageMediator });
    }
}
