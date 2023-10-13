/*
 * @Author: Abel Chan
 * @Date: 2020-08-24 23:49:39
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-25 22:31:13
 * @FilePath: \assets\script\UI\pool\GameNodePool.ts
 * @description: 
 */

import { _decorator, NodePool, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

import { GameWord } from "../panel/GameWord";
import { FillWord } from "../panel/FillWord";
import GameFacade from "../../Application/GameFacade";
import { WordData } from "../controller/playGame/WordData";

@ccclass('GameNodePool')
export default class GameNodePool {
    private static battleNodePool: NodePool = new NodePool();
    private static freeNodePool: NodePool = new NodePool();
    public static getBattleWordNode(word: WordData): Node {
        let node = this.battleNodePool.get(word);
        if (!node) {
            let res: Prefab = GameFacade.inst.resManager.getRes('prefabes/word', Prefab) as Prefab;
            node = instantiate(res);
            let gameWord: GameWord = node.getComponent(GameWord);
            gameWord.reuse(word);
        }
        return node;
    }
    public static getFreeWordNode(data: WordData): Node {
        let node = this.freeNodePool.get(data);
        if (!node) {
            let res: Prefab = GameFacade.inst.resManager.getRes('prefabes/word1', Prefab) as Prefab;
            node = instantiate(res);
            let fillWord: FillWord = node.getComponent(FillWord);
            fillWord.reuse(data);
        }
        return node;
    }

    public static putBattleWordNode(gameWord: GameWord): void {
        gameWord.unuse();
        this.battleNodePool.put(gameWord.node);
    }

    public static putFreeWordNode(fillWord: FillWord): void {
        fillWord.unuse();
        this.freeNodePool.put(fillWord.node);
    }
}
