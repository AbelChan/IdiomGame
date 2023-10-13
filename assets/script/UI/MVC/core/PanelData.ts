/*
 * @Author: Abel Chan
 * @Date: 2020-07-27 07:13:39
 * @LastEditors: Abel Chan
 * @LastEditTime: 2020-10-25 22:25:27
 * @FilePath: \assets\script\UI\MVC\core\PanelData.ts
 * @description: PanelData
 */

import { _decorator } from 'cc';
import { ACGStack } from "../../../acgframework/data_structure/ACGStack";
import BaseMediator from "./BaseMediator";

export class PanelData{
    mediator: BaseMediator = null;
    data: any = null;
    windowStack: ACGStack<PanelData> = new ACGStack();
}

