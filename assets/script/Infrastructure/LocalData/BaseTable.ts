/*
 * @Author: Abel Chan
 * @Date: 2020-07-08 00:55:44
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-11 02:26:16
 * @FilePath: \assets\script\Infrastructure\LocalData\BaseTable.ts
 * @description: 
 */

import { _decorator } from 'cc';
import { IBaseTable } from "./interface/IBaseTable";

export class BaseTable implements IBaseTable{
     protected _table: any = null;
     constructor(table: any){
        this._table = table;
     }
     get id(): any{
        return this._table.id;
     }
}
