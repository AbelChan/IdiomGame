/*
 * @Author: Abel Chan
 * @Date: 2020-07-08 07:50:07
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-11 02:26:33
 * @FilePath: \assets\script\Infrastructure\LocalData\IdiomTable.ts
 * @description: 成语表
 */

import { _decorator } from 'cc';
import { BaseTable } from "./BaseTable";

export default class IdiomTablel extends BaseTable {
    get id(): string {
        return this._table.word;
    }
   //词
    get word(): string {
        return this._table.word;
    }
   //拼音
    get pron(): string {
        return this._table.pron;
    }
   //出处
    get source(): string {
        return this._table.source;
    }
   //详细解释
    get expl(): string {
        return this._table.expl;
    }
}
