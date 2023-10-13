/*
 * @Author       : Abel Chan
 * @Date         : 2021-02-16 14:49:22
 * @LastEditors: Abel Chan
 * @LastEditTime: 2021-02-21 23:41:17
 * @FilePath: \assets\script\UI\ListView\DXListView.ts
 * @Description  : listView
 */

import { _decorator, Component, ScrollView, Node, Prefab, CCInteger } from 'cc';
const { ccclass, property, menu } = _decorator;

import { DXListItem } from "./DXListItem";
import { DXListDir } from "./DXListIViewEnum";

@ccclass('DXListView')
@menu('module/ListView/DXListView')
export default class DXListView extends Component {
    @property({
        type: ScrollView,
        tooltip: '控制的实际scrollview',
    })
    scrollview: ScrollView | null = null;
    @property({
        type: Boolean,
        tooltip: '是否反转列表 \n横向默认从左往右 \n纵向默认从上往下'
    })
    reverse: boolean = false;
    @property({
        type: Node,
        tooltip: 'item模板，node节点'
    })
    itemNode: Node | null = null;
    @property({
        type: Prefab,
        tooltip: 'item模板，prefab',
    })
    itemPrefab: Prefab | null = null;
    @property({
        type: CCInteger,
        tooltip: 'item之间的间隔',
    })
    spacing: number = 0;
    @property({
        type: CCInteger,
        tooltip: '单行(列)，item的数量',
    })
    colnum: number = 1;
    @property({
        type: CCInteger,
        tooltip: '默认加载行(列)数量',
    })
    defaultCount: number = 0;
    //item 模板
    private _templateItem: Node | null = null;
    // listView 滑动方向
    private _dir: DXListDir = DXListDir.Horizontal;
    // 上一次偏移的距离
    private _lastOffset: number = 0;
    // 滑动content
    private _content: Node | null = null;
    private _itemList: Node[] = [];
    // 列表数据
    private _dataList: any[] = [];
    private _jumpIndex: number = undefined;
    onEnable() {
        super.onEnable();
        this._jumpIndex = undefined;

    }
    onDisable() {
        this._jumpIndex = undefined;
        // gdk.Timer.clearAll(this);

        super.onDisable();
    }
    onLoad() {
        super.onLoad();
        this._content = this.scrollview.content;
        if (this.itemNode) {
            this._templateItem = this.itemNode;
        } else {
            this._templateItem = cc.instantiate(this.itemPrefab);
        }
        if (this.scrollview.horizontal) {
            this._dir = DXListDir.Horizontal;
            if (this.defaultCount === 0) {
                this.defaultCount = Math.floor(this.scrollview.node.width / (this._templateItem.width + this.spacing)) + 4;
            }
            // 设置滚动层的锚点
            if (this.reverse) {
                this._content.setAnchorPoint(cc.v2(1, 0.5));
            } else {
                this._content.setAnchorPoint(cc.v2(0, 0.5));
            }
        } else if (this.scrollview.vertical) {
            this._dir = DXListDir.Vertical;
            if (this.defaultCount === 0) {
                this.defaultCount = Math.floor(this.scrollview.node.height / (this._templateItem.height + this.spacing)) + 4;
            }
            // 设置滚动层的锚点
            if (this.reverse) {
                this._content.setAnchorPoint(cc.v2(0.5, 0));
            } else {
                this._content.setAnchorPoint(cc.v2(0.5, 1));
            }
        }
    }
    update(dt) {
        super.update(dt);
        if (!this.scrollview.isAutoScrolling() && !this.scrollview.isScrolling()) {
            //未滚动时不用更新
            return;
        }

        if (this._itemList.length < this.defaultCount) {
            //所有显示item数小于默认加载数时，不用更新
            return;
        }

        let content = this._content;
        let maskNode = content.parent;
        //滚动未超范围时不用更新
        let offset = 0;
        if (this._dir === DXListDir.Horizontal) {
            if (this.reverse) {
                offset = content.x - maskNode.width * (1 - maskNode.anchorX);
            } else {
                // 复数
                offset = content.x + maskNode.width * maskNode.anchorX;
            }
        } else {
            if (this.reverse) {
                offset = content.y + maskNode.height * (maskNode.anchorY);
            } else {
                offset = content.y - maskNode.height * (1 - maskNode.anchorY);
            }
        }
        offset = Math.abs(offset);
        if (this._lastOffset === 0) {
            this._lastOffset = offset;
            return;
        }

        if (offset - this._lastOffset > 0) {
            let secondItem = this._itemList[1];
            if (this._isUnContain(maskNode, secondItem)) {
                // 滑出
                let lastIndex = this._itemList[this._itemList.length - 1]['$index'];
                let dataIndex = lastIndex * this.colnum + 1;
                let data = this._dataList[dataIndex];
                if (data) {
                    let firstItem = this._itemList.shift();
                    firstItem["$index"] = lastIndex + 1;
                    this._setItemData(firstItem, this._dataList, lastIndex + 1);
                    this._itemList.push(firstItem);
                }
            }
        } else {
            let secondLastItem = this._itemList[this._itemList.length - 2];
            if (this._isUnContain(maskNode, secondLastItem)) {
                // 滑出
                let firstIndex = this._itemList[0]['$index'];
                let dataIndex = (firstIndex - 1) * this.colnum;
                let data = this._dataList[dataIndex];
                if (data) {
                    let lastItem = this._itemList.pop();
                    lastItem['$index'] = firstIndex - 1;
                    this._setItemData(lastItem, this._dataList, firstIndex - 1);
                    this._itemList.unshift(lastItem);
                }
            }
        }

        this._lastOffset = offset;
    }
    setData(dataList: any[], jumpIndex: number) {
        let newDataLen = dataList.length;
        let curDataLen = this._dataList.length;
        let itemLen = this._itemList.length;
        let newMaxItemLen = Math.ceil(newDataLen / this.colnum);
        let newItemLen = Math.min(newMaxItemLen, this.defaultCount);
        let deltaItemLen = newItemLen - itemLen;

        let [startIndex, endIndex] = [0, 0];
        if (jumpIndex !== undefined) {
            if (jumpIndex < 0) {
                jumpIndex += newDataLen;
            }

            if (jumpIndex + newItemLen > newDataLen) {
                startIndex = Math.max(newDataLen - newItemLen - 1, 0);
                endIndex = newDataLen - 1;
            } else {
                startIndex = Math.max(jumpIndex - 2, 0);
                endIndex = startIndex + newItemLen;
            }
        } else if (itemLen > 0) {
            startIndex = this._itemList[0]['$index'];
            endIndex = this._itemList[itemLen - 1]['$index'];
            if (endIndex > newMaxItemLen - 1) {
                endIndex = newMaxItemLen - 1;
                startIndex = Math.max(endIndex - newMaxItemLen, 0);
            }
        }

        if (deltaItemLen < 0) {
            //减少
            let deltaLen = -deltaItemLen;
            while (deltaLen--) {
                let itemNode = this._itemList.pop();
                itemNode.destroy();
            }
        }
        let itemIndex = 0;
        for (; itemIndex + startIndex <= endIndex && itemIndex < itemLen; ++itemIndex) {
            let itemNode = this._itemList[itemIndex];
            this._setItemData(itemNode, dataList, itemIndex + startIndex);
        }
        this._dataList = dataList.concat();
        if (deltaItemLen > 0) {
            // 新增
            gdk.Timer

        } else {
            if (this._jumpIndex !== undefined) {
                this._jumpContent(this._jumpIndex);
                this._jumpIndex = undefined;
            }
        }


    }
    private _addItem(itemIndex: number) {
        if (itemIndex >= 0) {
            let itemNode = this._createItem();
            itemNode.parent = this._content;
            this._itemList.push(itemNode);
            this._setItemData(itemNode, this._dataList, this._dataList.length - itemIndex);
        } else {
            if (this._jumpIndex !== undefined) {
                this._jumpContent(this._jumpIndex);
                this._jumpIndex = undefined;
            }
        }
    }
    private _createItem(): Node {
        let itemNode;
        if (this.colnum > 1) {
            itemNode = new cc.Node();
            if (this._dir === DXListDir.Horizontal) {
                itemNode.width = this._templateItem.width;
                itemNode.height = this._content.height;
            } else {
                itemNode.width = this._content.width;
                itemNode.height = this._templateItem.height;
            }
            for (let i = 0; i < this.colnum; ++i) {
                let childItem = cc.instantiate(this._templateItem);
                if (this._dir === DXListDir.Horizontal) {
                    childItem.x = 0;
                    childItem.y = itemNode.height / 2 - (2 * i + 1) / (2 * this.colnum) * itemNode.height;
                } else {
                    childItem.x = (2 * i + 1) / (2 * this.colnum) * itemNode.width - itemNode.width / 2;
                    childItem.y = 0;
                }
                childItem.parent = itemNode;
            }
        } else {
            itemNode = cc.instantiate(this._templateItem);
        }
        return itemNode;
    }
    private _setItemData(itemNode: Node, dataList: any[], itemIndex: number) {
        if (!itemNode) {
            return;
        }
        itemNode['$index'] = itemIndex;
        let itemW = this._templateItem.width;
        let itemH = this._templateItem.height;
        if (this._dir === DXListDir.Horizontal) {
            if (this.reverse) {
                itemNode.x = - itemIndex * (itemW + this.spacing) - this.spacing / 2 - itemW * (1 - this._templateItem.anchorX)
                itemNode.y = 0;
            } else {
                itemNode.x = itemIndex * (itemW + this.spacing) + this.spacing / 2 + itemW * this._templateItem.anchorX;
                itemNode.y = 0;
            }
        } else {
            if (this.reverse) {
                itemNode.x = 0;
                itemNode.y = itemIndex * (itemH + this.spacing) + this.spacing / 2 + itemH * this._templateItem.anchorY;
            } else {
                itemNode.x = 0;
                itemNode.y = -itemIndex * (itemH + this.spacing) - this.spacing / 2 - itemH * (1 - this._templateItem.anchorY)
            }
        }

        if (this.colnum > 1) {
            let children = itemNode.children;
            for (let i = 0; i < this.colnum; ++i) {
                let childItem = children[i];
                let index = i + this.colnum * itemIndex;
                let itemData = dataList[index];
                if (!itemData && childItem) {
                    childItem.active = false;
                } else if (itemData && childItem) {
                    childItem.active = true;
                    childItem.getComponent(DXListItem).updateItem(index, itemData);
                }
            }
        } else {
            let index = itemIndex;
            let itemData = dataList[index];
            itemNode.getComponent(DXListItem).updateItem(index, itemData);
        }
    }
    private _jumpContent(itemIndex: number) {
        if (itemIndex < 0) {
            let dataLen = this._dataList.length;
            let itemLen = Math.ceil(dataLen / this.colnum);
            itemIndex -= itemLen;
        }


        let content = this._content;
        let maskNode = content.parent;
        if (this._dir === DXListDir.Horizontal) {
            if (this.reverse) {
                let offset = itemIndex * (this._templateItem.width + this.spacing);
                if (offset < maskNode.width) {
                    offset = 0;
                }
                content.x = maskNode.width / 2 + offset;
            } else {
                let offset = itemIndex * (this._templateItem.width + this.spacing);
                if (offset < maskNode.width) {
                    offset = 0;
                }
                content.x = -maskNode.width / 2 - offset;
            }
        } else {
            if (this.reverse) {
                let offset = itemIndex * (this._templateItem.height + this.spacing);
                if (offset < maskNode.height) {
                    offset = 0;
                }
                content.x = -maskNode.height / 2 - offset;
            } else {
                let offset = itemIndex * (this._templateItem.height + this.spacing);
                if (offset < maskNode.height) {
                    offset = 0;
                }
                content.x = maskNode.height / 2 + offset;
            }
        }

    }
    /**
     * 判断item是否滑出maskNode（是否不可见）
     * @param maskNode 
     * @param item 
     */
    private _isUnContain(maskNode: Node, item: Node) {
        let itemPosInMask = cc.v2(item.x + this._content.x, item.y + this._content.y);
        return ((itemPosInMask.x + item.width * (1 - item.anchorX) < maskNode.width * (0 - maskNode.anchorX)) ||    // 左滑出
            (itemPosInMask.x + item.width * (0 - item.anchorX) > maskNode.width * (1 - maskNode.anchorX)) ||        // 右滑出
            (itemPosInMask.y + item.height * (1 - item.anchorY) < maskNode.height * (0 - maskNode.anchorY)) ||      // 下滑出
            (itemPosInMask.y + item.height * (0 - item.anchorY) > maskNode.height * (1 - maskNode.anchorY)));       // 上滑出
    }
}

