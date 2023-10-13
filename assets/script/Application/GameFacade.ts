/*
 * @Author: Abel Chan
 * @Date: 2020-09-11 00:15:09
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-14 23:23:32
 * @FilePath: \assets\script\Application\GameFacade.ts
 * @description:  Game层的代理，用来控制游戏的流程
 */

import { _decorator, Component, Enum } from 'cc';
const {ccclass, property} = _decorator;

import ACGTableRes from "../Infrastructure/LocalData/ACGTableRes";
import UIManager from "../Infrastructure/UIManager";
import { EventManager } from "../Infrastructure/EventDispater/EventSystem";
import StartGameMediator from "../UI/mediator/StartGameMediator";
import { EventName } from "../Infrastructure/EventDispater/EventName";
import NotificationFacade from "./NotificationFacade";
import GameResManager from "./GameResManager";
import { GameProfile } from "../profile/GameProfile";
import ACGLocalStorage from "../Infrastructure/LocalStorage/ACGLocalStorage";
import { ACGLogLevel } from "../acgframework/log/ACGLogLevel";
import { ACGLog } from "../acgframework/log/ACGLog";
import { ACGConsoleAppender } from "../acgframework/log/ACGConsoleAppender";

@ccclass('GameFacade')
export default class GameFacade extends Component {
    static _inst: GameFacade = null;
    public static get inst(): GameFacade{
        return GameFacade._inst;
    }
    public get tableRes(): ACGTableRes{
        return this.getComponent(ACGTableRes);
    }
    public get NotificationFacade(): NotificationFacade{
        return this.getComponent(NotificationFacade);
    }
    public get resManager(): GameResManager{
        return this.getComponent(GameResManager);
    }
    @property({type: Enum(ACGLogLevel)})
    private logLevel: ACGLogLevel = ACGLogLevel.ALL;
    private _time: number = 0;
    private _profile: GameProfile = null;
    private readonly _profileKey: string = "GameProfile";
    onLoad () {
        GameFacade._inst = this;
        this._setLogParam();
    }
    start () {
        this._time = Date.now();
        this.preloadRes();
    }
    public saveProfile(){
        ACGLocalStorage.setItem(this._profileKey, JSON.stringify(this._profile));
    }
   /**
    * 加载资源
    */
    private preloadRes(){
        this.resManager.preloadRes(() => {
        this.loadTableData();
        });
    }
   /**
    * 加载 存档 初始化
    */
    private loadProfile(){
        this._profile = GameProfile.fromJSON(ACGLocalStorage.getItem(this._profileKey));
        UIManager.inst.loadProfile(this._profile);
        ACGLog.info("GameFacade", "loadProfile times:" + (Date.now() - this._time));
        this._time = Date.now();
        EventManager.getMainEventSystem().dispatchEvent(EventName.SHOW_PANEL, {view: StartGameMediator});
        ACGLog.info("GameFacade", "showPanel times:" + (Date.now() - this._time));
        this._time = Date.now();
    }
   /**
    * 加载 table 数据
    */
    private loadTableData(){
        this.tableRes.loadData(() => {
        ACGLog.info("GameFacade", "loadTableData times:" + (Date.now() - this._time));
        this._time = Date.now();
        this.loadProfile();
        });
    }
   /**
    * 设置日志输出器  参数
    */
    private _setLogParam(){
        ACGLog.logger.setLogLevel(this.logLevel);
        ACGLog.logger.addAppender(new ACGConsoleAppender());
    }
}
