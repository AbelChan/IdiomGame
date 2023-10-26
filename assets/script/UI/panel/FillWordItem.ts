

import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

import { WordData } from "../controller/playGame/WordData";
import { FillWordData } from '../controller/playGame/FillWordData';

@ccclass('FillWordItem')
export class FillWordItem extends Component {
    @property(Label)
    private label: Label | null = null;
    private _wordData: FillWordData = null;
    private _onBtnCallback: Function = null;
    onLoad() {

    }
    start() {

    }
    reuse(word: FillWordData) {
        this._wordData = word;
        this.string = word.word;
    }
    unuse() {

    }
    set string(val: string) {
        this.label.string = val;
    }
    public setBtnClickCallback(cb: Function) {
        this._onBtnCallback = cb;
    }
    private onBtnClick() {
        this._onBtnCallback && this._onBtnCallback(this._wordData);
        this.node.active = false;
    }
}

