/*
 * @Author: Abel Chan
 * @Date: 2020-06-23 01:01:16
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-11 01:09:49
 * @FilePath: \assets\script\UI\MVC\core\BaseController.ts
 * @description: 
 */

import { _decorator, Component } from 'cc';
import { IController } from "../interface/IController";
import { IObserver } from "../interface/IObserver";
import { GameProfile } from "../../../profile/GameProfile";

export class BaseController extends Component {
    private _isLoadProfile: boolean = false;
    registerObserver(notificationName: string, observer: IObserver): void {

    }
    removeObserver(notificationName: string, notifyContext: any): void {

    }
    beforeLoadProfile() {

    }
    loadProfile(profile: GameProfile) {
        this._isLoadProfile = true;
    }
    afterLoadProfile() {

    }
    isLoadProfile(): boolean {
        return this._isLoadProfile;
    }
    // onLoad () {}
    // start () {
    // }
    // update (dt) {}
}

