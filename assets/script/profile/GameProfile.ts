/*
 * @Author: Abel Chan
 * @Date: 2020-07-29 22:57:12
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-10 23:27:40
 * @FilePath: \assets\script\profile\GameProfile.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { StageProfile } from "./StageProfile";

export class GameProfile {
    static fromJSON(json: string): any {
        if (json) {
            return JSON.parse(json);
        }
        return GameProfile.makeDefault();
    }
    static makeDefault(): GameProfile {
        let profile = new GameProfile();
        return profile;
    }
    stage: StageProfile = new StageProfile();
}