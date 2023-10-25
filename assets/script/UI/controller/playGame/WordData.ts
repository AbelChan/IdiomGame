/*
 * @Author: Abel Chan
 * @Date: 2020-07-31 00:18:21
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-25 22:54:56
 * @FilePath: \assets\script\UI\controller\playGame\WordData.ts
 * @description: 
 */

import { _decorator } from 'cc';
import StageTable from "../../../Infrastructure/LocalData/StageTable";
import { StageWordItem } from "../../../profile/StageProfile";
export enum WORD_TYPE {
    Type_Game,      //游戏中词类型
    Type_Fill,      //填充中词类型
}
export enum WORD_STATE {
    NONE = 0,       //无状态
    EMPTY = 1,      //空白状态

    NORMAL,         //原始状态 

    FILL,           //被填充状态

    FILLFAIL,       //填词完成但失败

    COMPLETE,       //填词完成状态
}

export class WordData {
    private _word: string = "";
    private _showWord: string = "";
    private _index: number = 0;
    private _fillIndex: number = 0;
    private _wordState: WORD_STATE = WORD_STATE.NONE;
    initWithProfile(profile: StageWordItem) {
        this._word = profile.word;
        this._showWord = profile.showWord;
        this._index = profile.index;
        this._wordState = profile.wordState;
    }

    initWithStageTable(word: string, index: number, pos: number[]) {
        this._word = word;
        this._showWord = word;
        this._index = index;
        this._wordState = WORD_STATE.NONE;
    }

    get word(): string {
        return this._word;
    }

    get showWord(): string {
        return this._showWord;
    }

    //设置填充汉字 index
    set fillIndex(index: number) {
        if (this._wordState == WORD_STATE.FILL || this._wordState === WORD_STATE.FILLFAIL) {
            this._fillIndex = index;
        }
    }

    //获取填充汉字index
    get fillIndex(): number {
        return this._fillIndex;
    }

    //设置目前所在的index
    set index(val: number) {
        this._index = val;
    }

    get index(): number {
        return this._index;
    }

    set wordState(val: WORD_STATE) {
        if (val === WORD_STATE.EMPTY) {
            this._showWord = "";
        }
        this._wordState = val;
    }

    get wordState(): WORD_STATE {
        return this._wordState;
    }
}

