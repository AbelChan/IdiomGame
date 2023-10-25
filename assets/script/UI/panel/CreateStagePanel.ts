import { _decorator, Component, EventTouch, Label, Node } from 'cc';
import { CreateStageController } from '../controller/playGame/CreateStageController';
import UIManager from '../../Infrastructure/UIManager';
import BasePanel from '../MVC/core/BasePanel';
const { ccclass, property } = _decorator;

@ccclass('CreateStagePanel')
export class CreateStagePanel extends BasePanel {
    @property(Label)
    curIdionLabel: Label = null!
    @property(Node)
    idionParentNode: Node = null!


    private _stageCfg: {
        word: string[],
        barrier: number[],
        idiom: string[],
        idiomIndex: number[][],
        posx: number[],
        posy: number[],
        answer: number[],
    } = {
            word: [],
            barrier: [],
            idiom: [],
            idiomIndex: [],
            posx: [],
            posy: [],
            answer: []
        };
    start() {
        this.idionParentNode.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.idionParentNode.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.idionParentNode.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    protected onDestroy(): void {
        this.idionParentNode.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.idionParentNode.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.idionParentNode.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(deltaTime: number) {

    }

    private onTouchStart(eventTouch: EventTouch) {
        eventTouch.target;
        eventTouch.bubbles = true;
        eventTouch.preventSwallow = true;

    }

    private onTouchMove(eventTouch: EventTouch) {
        eventTouch.target;
        eventTouch.bubbles = true;
        eventTouch.preventSwallow = true;

        console.log("LocationInViewX: " + eventTouch.getLocationInView().x + " LocationInViewY: " + eventTouch.getLocationInView().y);
        // console.log("LocationX: " + eventTouch.getLocation().x + " LocationY: " + eventTouch.getLocation().y);
        // console.log("UILocationX: " + eventTouch.getUILocation().x + " UILocationY: " + eventTouch.getUILocation().y);
        console.log(`getLocationX:${eventTouch.getLocationX()}, getLocationY: ${eventTouch.getLocationY()}`);
    }

    private onTouchEnd(eventTouch: EventTouch) {
        eventTouch.target;
        eventTouch.bubbles = true;
        eventTouch.preventSwallow = true;
    }

    private randomIdiom() {
        let lastIdiom = this._stageCfg.idiom[this._stageCfg.idiom.length - 1];
        let randomI = 0;
        if (lastIdiom) {
            randomI = Math.floor(Math.random() * lastIdiom.length);
        }
        let controller: CreateStageController = UIManager.inst.getComponent(CreateStageController);
        let idiom = controller.randomIdiom(lastIdiom, randomI);
        return idiom;
    }

    private onRandomIdiomClick() {
        let idiom = this.randomIdiom();
        this.curIdionLabel.string = idiom;
    }

    private onSaveStageClick() {

    }
}


