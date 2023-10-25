/*
 * @Author: Abel Chan
 * @Date: 2020-07-12 16:40:19
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-22 00:23:52
 * @FilePath: \assets\script\Infrastructure\UIManager.ts
 * @description: 
 */

import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import { ViewType } from "../UI/MVC/ViewType";
import BaseMediator from "../UI/MVC/core/BaseMediator";
import StartGameMediator from "../UI/mediator/StartGameMediator";
import PlayGameMediator from "../UI/mediator/PlayGameMediator";
import { EventManager } from "./EventDispater/EventSystem";
import { EventName } from "./EventDispater/EventName";
import { ACGStack } from "../acgframework/data_structure/ACGStack";
import BasePanel from "../UI/MVC/core/BasePanel";
import { PanelData } from "../UI/MVC/core/PanelData";
import { GameProfile } from "../profile/GameProfile";
import { PlayGameController } from "../UI/controller/playGame/PlayGameController";
import { BaseController } from "../UI/MVC/core/BaseController";
import ACGLocalStorage from "./LocalStorage/ACGLocalStorage";
import { ACGLog } from "../acgframework/log/ACGLog";
import CreateStageMediator from '../UI/mediator/CreateStageMediator';
import { CreateStageController } from '../UI/controller/playGame/CreateStageController';

@ccclass('UIManager')
export default class UIManager extends Component {
    _panelMediator: BaseMediator = null;
    _windowMediator: BaseMediator = null;
    _panelQueue: ACGStack<PanelData> = new ACGStack(50); // 展示UI的队列
    private static _inst: UIManager = null;
    static get inst(): UIManager {
        return UIManager._inst;
    }
    private TAG = "UIManager";

    onLoad() {
        UIManager._inst = this;
        this.registerEvents();
        this.addMediators();
        this.addViewControllers();
    }
    onDestroy() {
        this.unRegisterEvents();
    }

    start() {

    }
    // update (dt) {}
    public loadProfile(profile: GameProfile) {

        let componentes = this.getComponents(BaseController);

        // 加载存档前调用
        componentes.forEach((component, index) => {
            component.beforeLoadProfile();
        });

        // 加载存档
        componentes.forEach((component, index) => {
            component.loadProfile(profile);
        });

        // 加载存档后调用
        componentes.forEach((component, index) => {
            component.afterLoadProfile();
        });
    }
    private addMediators() {
        this.addComponent(StartGameMediator);
        this.addComponent(PlayGameMediator);
        this.addComponent(CreateStageMediator);
    }
    private addViewControllers() {
        this.addComponent(PlayGameController);
        this.addComponent(CreateStageController);
    }
    private registerEvents() {
        let eventSystem = EventManager.getMainEventSystem();
        eventSystem.registerEvent(EventName.SHOW_PANEL, this._eventShowPanel.bind(this));
        eventSystem.registerEvent(EventName.HIDE_PANEL, this._eventHidePanel.bind(this));
    }
    private unRegisterEvents() {
        let eventSystem = EventManager.getMainEventSystem();
        eventSystem.unRegisterEvent(EventName.SHOW_PANEL, this._eventShowPanel.bind(this));
        eventSystem.unRegisterEvent(EventName.HIDE_PANEL, this._eventHidePanel.bind(this));

    }

    showPanel<T extends BaseMediator>(view: T, data: any) {
        let panelData = new PanelData();
        panelData.mediator = view;
        panelData.data = data;

        let viewType = view.viewType;
        view.getPanel((panel: BasePanel) => {
            if (viewType === ViewType.Panel) {
                this._panelQueue.push(panelData);
                if (this._panelMediator) {
                    let lastPanel = this._panelMediator.panel;
                    this.node.removeChild(lastPanel.node);
                    if (this._windowMediator) {
                        let lastWindow = this._windowMediator;
                        this.node.removeChild(lastWindow.node);
                    }
                }
                this._panelMediator = view;
                let node = view.panel.node;
                node.parent = this.node;
                node.setSiblingIndex(viewType);
                view.refreshView(data);
            } else if (viewType === ViewType.Window) {
                let panelData = this._panelQueue.peek();
                panelData.windowStack.push(panelData);
                if (this._windowMediator) {
                    let lastWindow = this._windowMediator.panel;
                    this.node.removeChild(lastWindow.node);
                }
                this._windowMediator = view;
                let node = view.panel.node;
                node.parent = this.node;
                node.setSiblingIndex(viewType);
                view.refreshView(data);
            } else if (viewType === ViewType.UI) {

            }
        });
    }
    hidePanel<T extends BaseMediator>(view: T) {
        let viewType = view.viewType;
        if (viewType === ViewType.Panel) {
            let lastPanelData = this._panelQueue.peek();
            if (lastPanelData.mediator === view) {
                let node = view.panel.node;
                this.node.removeChild(node);
                this._panelQueue.pop();
                let curPanelData = this._panelQueue.peek();
                let curMediator = curPanelData.mediator;
                curMediator.panel.node.parent = this.node;
                curPanelData.mediator.refreshView(curPanelData.data);
                let windowStack = curPanelData.windowStack;
                if (windowStack.size > 0) {
                    let curWindowData = windowStack.peek();
                    curMediator = curWindowData.mediator;
                    let windowNode = curMediator.panel.node;
                    windowNode.parent = this.node;
                    node.setSiblingIndex(viewType);
                    curMediator.refreshView(curWindowData.data);
                } else {
                    this._windowMediator = null;
                }
            }
        } else if (viewType === ViewType.Window) {
            if (this._windowMediator === view) {
                this.node.removeChild(view.panel.node);
                let panelData = this._panelQueue.peek();
                let windowStack = panelData.windowStack;
                windowStack.pop();
                if (windowStack.isEmpty()) {
                    this._windowMediator = null;
                }
            }
        } else if (viewType === ViewType.UI) {

        }
    }
    private _eventShowPanel<T extends BaseMediator>(viewData: { view: { prototype: T }, data: any }) {
        let viewComponet = this.getComponent(viewData.view);
        this.showPanel(viewComponet, viewData.data);
    }
    private _eventHidePanel<T extends BaseMediator>(view: { prototype: T }) {
        let viewComponet = null;
        if (view instanceof BaseMediator) {
            viewComponet = view;
        } else {
            viewComponet = this.getComponent(view);
        }
        this.hidePanel(viewComponet);
    }
}

