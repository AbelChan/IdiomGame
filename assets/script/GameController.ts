


/*
 * @Author: Abel Chan
 * @Date: 2020-07-15 08:15:35
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-29 00:26:43
 * @FilePath: \assets\script\GameController.ts
 * @description:
 */

import { Component, _decorator } from "cc";
import { EventManager } from "./Infrastructure/EventDispater/EventSystem";
import { EventName } from "./Infrastructure/EventDispater/EventName";
import StartGameMediator from "./UI/mediator/StartGameMediator";
const { ccclass, property } = _decorator;

@ccclass
export default class GameController extends Component {
    private static _inst: GameController = null;

    static get inst(): GameController {
        return GameController._inst;
    }

    onLoad() {
        // this.loadData();
        GameController._inst = this;
    }

    start() {
        EventManager.getMainEventSystem().dispatchEvent(EventName.SHOW_PANEL, { view: StartGameMediator });
    }

    // update (dt) {}

    loadData() {
        // ACGTableRes.loadData(() => {

        // });
    }

}
