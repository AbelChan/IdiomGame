/*
 * @Author: Abel Chan
 * @Date: 2020-07-12 16:47:11
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-07-28 23:47:45
 * @FilePath: \assets\script\UI\mediator\StartGameMediator.ts
 * @description: 
 */

import { _decorator } from 'cc';
import BaseMediator from "../MVC/core/BaseMediator";
import { ViewType } from "../MVC/ViewType";

export default class StartGameMediator extends BaseMediator implements IMediator {
    onLoad() {
        super.onLoad();
        this.viewType = ViewType.Panel;
        this.prefabsRes = "prefabes/mainScene";
    }
    start() {
        super.start();

    }
    // update (dt) {}

    refreshView(data: any) {
        super.refreshView(data);

    }
}
