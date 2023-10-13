/*
 * @Author: Abel Chan
 * @Date: 2020-07-29 22:43:55
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-15 23:09:34
 * @FilePath: \assets\script\profile\StageProfile.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { BaseProfile } from "./BaseProfile";
import { WORD_STATE, WordData } from "../UI/controller/playGame/WordData";

export class StageWordItem {
    word: string = "";
    index: number = 0;
    wordState: WORD_STATE = 0;
}

export class StageProfile extends BaseProfile {
    stageId: number = 0;
    battleWords: WordData[] = [];
    freeWords: WordData[] = [];
}


