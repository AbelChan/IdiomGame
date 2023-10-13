import { _decorator, Component, Node } from 'cc';
import { GameWord } from '../panel/GameWord';
import GameNodePool from './GameNodePool';
import { FillWord } from '../panel/FillWord';
const { ccclass, property } = _decorator;

@ccclass('RecoveryComponent')
export class RecoveryComponent extends Component {
    start() {
        this.node.on(Node.EventType.NODE_DESTROYED, this.recycleAllNode, this);
    }

    onDestroy() {
        this.node.off(Node.EventType.NODE_DESTROYED, this.recycleAllNode, this);
    }

    public recycleAllNode() {
        let uiCommponents: GameWord[] = [];
        for (let index = 0, len = this.node.children.length; index < len; ++index) {
            let element = this.node.children[index];
            let components = element.getComponentsInChildren(GameWord);
            uiCommponents = uiCommponents.concat(components);
        }
        for (let index = 0, len = uiCommponents.length; index < len; ++index) {
            let element = uiCommponents[index];
            GameNodePool.putBattleWordNode(element);
        }


        let fillWordComponents: FillWord[] = [];
        for (let index = 0, len = this.node.children.length; index < len; ++index) {
            let element = this.node.children[index];
            let components = element.getComponentsInChildren(FillWord);
            fillWordComponents = fillWordComponents.concat(components);
        }
        for (let index = 0, len = fillWordComponents.length; index < len; ++index) {
            let element = fillWordComponents[index];
            GameNodePool.putFreeWordNode(element);
        }
    }
}


