/*
 * @Author: Abel Chan
 * @Date: 2020-07-12 17:27:51
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-22 00:30:35
 * @FilePath: \assets\script\UI\MVC\core\BaseMediator.ts
 * @description: 
 */

import { _decorator, Component, Prefab, Node, Button, find, resources, instantiate } from 'cc';
const { ccclass, property } = _decorator;

import { ViewType } from "../ViewType";
import BasePanel from "./BasePanel";
import { EventName } from "../../../Infrastructure/EventDispater/EventName";
import { EventManager } from "../../../Infrastructure/EventDispater/EventSystem";

@ccclass('BaseMediator')
export default class BaseMediator extends Component {

    public viewType: ViewType = ViewType.Panel;
    public prefabsRes: string = "";
    public viewPrefabs: Prefab | null = null;
    public panel: BasePanel = null;


    onLoad() {

    }
    start() {

    }
    // update (dt) {}
    refreshView(data: any) {

    }
    getPanel(cb: (panel: BasePanel) => void) {
        if (this.panel) {
            cb(this.panel);
        } else {
            resources.load(this.prefabsRes, Prefab, (err: Error, assets: Prefab) => {
                if (!err) {
                    let node: Node = instantiate(assets);
                    this.setCloseBtnCallBack(node);
                    let panel = node.getComponent(BasePanel);
                    panel.mediator = this;
                    this.panel = panel;
                    cb(panel);
                }
            });
        }
    }
    private setCloseBtnCallBack(node: Node) {
        let closeNode = find("closeBtn", node);
        if (!closeNode) {
            return;
        }
        let btn = closeNode.getComponent(Button);
        let eventHandler = new Component.EventHandler()
        eventHandler.target = node;
        eventHandler.component = "BasePanel";
        eventHandler.handler = "onClose";
        btn.clickEvents.push(eventHandler);
    }
    dispatchEvent(eventName: EventName, data: any) {
        EventManager.getMainEventSystem().dispatchEvent(eventName, data);
    }
    dispatchEventWithEventSystem() {
        //TODO
    }
    // protected getController <T extends BaseController> (type: {prototype: T}): T {
    //     return UIManager.inst.getComponent(type);
    // }
}


