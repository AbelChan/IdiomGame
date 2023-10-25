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

import { GameWordItem } from "../panel/GameWordItem";
import { FillWordItem } from "../panel/FillWordItem";
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
            let gameWord: GameWordItem = node.getComponent(GameWordItem);
            gameWord.reuse(word);
        }
        return node;
    }
    public static getFreeWordNode(data: WordData): Node {
        let node = this.freeNodePool.get(data);
        if (!node) {
            let res: Prefab = GameFacade.inst.resManager.getRes('prefabes/word1', Prefab) as Prefab;
            node = instantiate(res);
            let fillWord: FillWordItem = node.getComponent(FillWordItem);
            fillWord.reuse(data);
        }
        return node;
    }

    public static putBattleWordNode(gameWord: GameWordItem): void {
        gameWord.unuse();
        this.battleNodePool.put(gameWord.node);
    }

    public static putFreeWordNode(fillWord: FillWordItem): void {
        fillWord.unuse();
        this.freeNodePool.put(fillWord.node);
    }
}
