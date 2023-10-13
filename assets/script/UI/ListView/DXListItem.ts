/*
 * @Author       : Abel Chan
 * @Date         : 2021-02-16 14:45:01
 * @LastEditors  : Abel Chan
 * @LastEditTime : 2021-02-20 10:05:12
 * @FilePath     : \assets\Script\Common\Component\ListView\DXListItem.ts
 * @Description  : listView item
 */

import { _decorator, Component } from 'cc';
const { ccclass, property, menu } = _decorator;

@ccclass('DXListItem')
@menu('module/ListView/DXListItem')
export class DXListItem extends Component {
    protected _index: number = 0;
    protected _item: any = null;
    onLoad() {
        super.onLoad();
        this.node.on('touchend', this.touchItem, this);
    }
    onEnable() {
        super.onEnable();

    }
    touchItem() {

    }
    updateItem(index, item) {
        this._index = index;
        this._item = item;
    }
    get index(): number {
        return this._index;
    }
    getItemData(): any {
        return this._item;
    }
}
