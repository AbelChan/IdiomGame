// /*
//  * @Author: Abel Chan
//  * @Date: 2020-08-24 23:49:39
//  * @LastEditors: Abel Chan
//  * @LastEditTime: 2020-10-25 22:31:13
//  * @FilePath: \assets\script\UI\pool\GameNodePool.ts
//  * @description: 
//  */

import { _decorator, NodePool, Node } from 'cc';
const {ccclass, property} = _decorator;

import { GameWord } from "../panel/GameWord";
import { FillWord } from "../panel/FillWord";
import GameResManager from "../../Application/GameResManager";
import GameFacade from "../../Application/GameFacade";
import { WordData } from "../controller/playGame/WordData";

@ccclass('GameNodePool')
export default class GameNodePool {
    private static battleNodePool: NodePool = new NodePool(GameWord);
    private static freeNodePool: NodePool = new NodePool(FillWord);
    public static getBattleWordNode(word: WordData): Node{
        // let node = this.battleNodePool.get(word);
        // if(!node){
        // let res: cc.Prefab = GameFacade.inst.resManager.getRes('prefabes/word', cc.Prefab) as cc.Prefab;
        // node = cc.instantiate(res);
        // let gameWord: GameWord = node.getComponent(GameWord);
        // gameWord.resume(word);
        // }
        // return node;
    }
    public static getFreeWordNode(data: WordData): Node{
        // let node = this.freeNodePool.get(data);
        // if(!node){
        // let res: cc.Prefab = GameFacade.inst.resManager.getRes('prefabes/word1', cc.Prefab) as cc.Prefab;
        // node = cc.instantiate(res);
        // let fillWord: FillWord = node.getComponent(FillWord);
        // fillWord.resume(data);
        // }
        // return node;
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// /*
//  * @Author: Abel Chan
//  * @Date: 2020-08-24 23:49:39
//  * @LastEditors: Abel Chan
//  * @LastEditTime: 2020-10-25 22:31:13
//  * @FilePath: \assets\script\UI\pool\GameNodePool.ts
//  * @description: 
//  */
// 
// import { GameWord } from "../panel/GameWord";
// import { FillWord } from "../panel/FillWord";
// import GameResManager from "../../Application/GameResManager";
// import GameFacade from "../../Application/GameFacade";
// import { WordData } from "../controller/playGame/WordData";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class GameNodePool {
// 
//     private static battleNodePool: cc.NodePool = new cc.NodePool(GameWord);
//     private static freeNodePool: cc.NodePool = new cc.NodePool(FillWord);
// 
//     public static getBattleWordNode(word: WordData): cc.Node{
//         let node = this.battleNodePool.get(word);
//         if(!node){            
//             let res: cc.Prefab = GameFacade.inst.resManager.getRes('prefabes/word', cc.Prefab) as cc.Prefab;
//             node = cc.instantiate(res);
//             let gameWord: GameWord = node.getComponent(GameWord);
//             gameWord.resume(word);           
//         }
//         return node;
//     }
// 
//     public static getFreeWordNode(data: WordData): cc.Node{
//         let node = this.freeNodePool.get(data);
//         if(!node){
//             let res: cc.Prefab = GameFacade.inst.resManager.getRes('prefabes/word1', cc.Prefab) as cc.Prefab;
//             node = cc.instantiate(res);
//             let fillWord: FillWord = node.getComponent(FillWord);
//             fillWord.resume(data);         
//         }
//         return node;
//     }
// }
