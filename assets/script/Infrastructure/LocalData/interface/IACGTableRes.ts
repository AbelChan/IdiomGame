/*
 * @Author: Abel Chan
 * @Date: 2020-09-11 02:05:54
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-11 02:20:59
 * @FilePath: \assets\script\Infrastructure\LocalData\interface\IACGTableRes.ts
 * @description: 
 */

import { BaseTable } from "../BaseTable";
import { TableEnum } from "../TableEnum";



export interface IACGTableRes{
    // bundle: cc.AssetManager.Bundle;
    // tables: Map<string, Map<string, BaseTable>>;
    // _loadedTable: string[];
    // _loadedCallback: ()=>void;
    
    //获得表资源
    getTableRes(tableType: TableEnum, id: number): BaseTable | null;
    //加载数据表
    loadData(cb: ()=>void): void;
}