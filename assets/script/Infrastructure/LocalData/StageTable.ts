/*
 * @Author: Abel Chan
 * @Date: 2020-07-08 07:40:26
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-11 02:27:19
 * @FilePath: \assets\script\Infrastructure\LocalData\StageTable.ts
 * @description: 关卡信息
 */

import { _decorator } from 'cc';
import { BaseTable } from "./BaseTable";

export default class StageTable extends BaseTable {
    get id(): number {
        return this._table.id;
    }

    //所有 词
    get word(): string[] {
        return this._table.word;
    }

    //所有 成语
    get idiom(): string[] {
        return this._table.idiom;
    }

    // 所有成语词的 index
    get idiomIndex(): number[][] {
        return this._table.idiomIndex;
    }

    //障碍物 位置
    get barrier(): number[] {
        return this._table.barrier;
    }

    //获得词的 位置坐标
    getWordPos(wordIndex: number): number[] {
        return [this._table.posx[wordIndex], this._table.posy[wordIndex]];
    }

    //空缺位 单词
    get answer(): number[] {
        return this._table.answer;
    }
}

