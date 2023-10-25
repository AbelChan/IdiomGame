/*
 * @Author: Abel Chan
 * @Date: 2020-06-24 00:51:14
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-13 23:53:02
 * @FilePath: \assets\script\Infrastructure\LocalData\ACGTableRes.ts
 * @description: 
 */

import { _decorator, Component, AssetManager, JsonAsset, assetManager } from 'cc';
const { ccclass, property } = _decorator;

import { BaseTable } from "./BaseTable";
import { TableEnum } from "./TableEnum";
import StageTable from "./StageTable";
import IdiomTablel from "./IdiomTable";
import { IACGTableRes } from "./interface/IACGTableRes";

@ccclass('ACGTableRes')
export default class ACGTableRes extends Component implements IACGTableRes {
    private bundle: AssetManager.Bundle = null;
    private tables: Map<string, Map<string, BaseTable>> = new Map();
    private tables2: Map<string, Array<BaseTable>> = new Map();
    private _loadedTable: string[] = [];
    private _loadedCallback: () => void = null;

    public getTableAllRes(tableType: TableEnum): Array<BaseTable> {
        let tables: Array<BaseTable> = this.tables2.get(tableType);
        if (!tables) {
            return new Array();
        }

        return tables;
    }

    public getTableRes(tableType: TableEnum, id: number): BaseTable | null {
        let tables: Map<string, BaseTable> = this.tables.get(tableType);
        if (!tables) {
            return null;
        }
        let table: BaseTable = tables.get(id + "");
        return table;
    }

    public loadData(cb: () => void) {
        this._loadedCallback = cb;
        assetManager.loadBundle('data', (err, bundle) => {
            if (!err) {
                this.bundle = bundle;
                this.loadFirstData();
                this.loadWordInfoData();
            }
        });
    }

    private loadFirstData() {
        this.bundle.load('first', JsonAsset, (err: Error, asset: JsonAsset) => {
            if (!err) {
                let jsonData = asset.json;
                let map = new Map();
                this.tables.set(TableEnum.Stage, map);
                let array = new Array();
                this.tables2.set(TableEnum.Stage, array);
                for (let key in jsonData) {
                    let data = jsonData[key];
                    let stageTable = new StageTable(data);
                    map.set(stageTable.id + "", stageTable);
                    array.push(stageTable);
                }
                this.setTableLoadState(TableEnum.Stage);
            } else {
                this.loadFirstData();
            }
        });
    }

    private loadWordInfoData() {
        this.bundle.load('wordInfo', JsonAsset, (err: Error, asset: JsonAsset) => {
            if (!err) {
                let jsonData = asset.json;
                let map = new Map();
                this.tables.set(TableEnum.Idiom, map);
                let array = new Array();
                this.tables2.set(TableEnum.Idiom, array);
                for (let key in jsonData) {
                    let data = jsonData[key];
                    let stageTable = new IdiomTablel(data);
                    map.set(stageTable.id + "", stageTable);
                    array.push(stageTable);
                }
                this.setTableLoadState(TableEnum.Idiom);
            } else {
                this.loadWordInfoData();
            }
        });
    }

    private setTableLoadState(table: string) {
        this._loadedTable.push(table);

        let isAllLoaded = true;
        for (let key in TableEnum) {
            if (this._loadedTable.indexOf(TableEnum[key]) === -1) {
                isAllLoaded = false;
                break;
            }
        }

        if (isAllLoaded && this._loadedCallback) {
            this._loadedCallback();
        }
    }
}

