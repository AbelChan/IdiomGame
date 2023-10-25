/*
 * @Author: Abel Chan
 * @Date: 2020-07-23 07:56:00
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-07-29 00:55:29
 * @FilePath: \assets\script\UI\MVC\core\BasePanel.ts
 * @description: 
 */

import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import BaseMediator from "./BaseMediator";
import { EventManager } from "../../../Infrastructure/EventDispater/EventSystem";
import { EventName } from "../../../Infrastructure/EventDispater/EventName";

@ccclass('BasePanel')
export default class BasePanel extends Component {
    // onLoad () {}
    start() {

    }
    // update (dt) {}
    protected _mediator: BaseMediator = null;
    set mediator(val: BaseMediator) {
        this._mediator = val;
    }

    get mediator() {
        return this._mediator;
    }

    private onClose() {
        EventManager.getMainEventSystem().dispatchEvent(EventName.HIDE_PANEL, this._mediator);
    }
}

