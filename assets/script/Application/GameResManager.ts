/*
 * @Author: Abel Chan
 * @Date: 2020-09-12 23:30:10
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-09-15 00:38:34
 * @FilePath: \assets\script\Application\GameResManager.ts
 * @description: 
 */

import { _decorator, Component, Asset, Prefab } from 'cc';
const {ccclass, property} = _decorator;

import ACGAssetManager from "../Infrastructure/AssetManager/ACGAssetManager";

@ccclass('GameResManager')
export default class GameResManager extends Component {
    
    public preloadRes(cb: ()=>void){
        this.preloadWord(cb);
    }
    public getRes(url: string, type: typeof Asset): Asset{
        return ACGAssetManager.getRes(null, url, type);
    }
    private preloadWord(cb: ()=>void){
        ACGAssetManager.loadResArray(null, ["prefabes/word", "prefabes/word1"], Prefab, (err, res) => {
        cb();
        });
    }
}
