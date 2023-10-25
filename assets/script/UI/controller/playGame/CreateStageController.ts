



import { _decorator } from 'cc';
const { ccclass, property } = _decorator;
import { BaseController } from '../../MVC/core/BaseController';
import IdiomTablel from '../../../Infrastructure/LocalData/IdiomTable';
import { TableEnum } from '../../../Infrastructure/LocalData/TableEnum';
import GameFacade from '../../../Application/GameFacade';


@ccclass('CreateStageController')
export class CreateStageController extends BaseController {
    private _idiomArray: Array<IdiomTablel> | null = null;

    randomIdiom(word: string = "", index: number = 0): string {
        let idiomArray = this.getIdiomArray();
        if (word.length == 0) {
            let randomI = Math.floor(Math.random() * idiomArray.length);
            let table = idiomArray[randomI]
            return table.word
        } else {
            let returnArr = [];
            let str = word[index];
            for (let index = 0, len = this._idiomArray.length; index < len; ++index) {
                let element = this._idiomArray[index];
                if (element.word.indexOf(str) !== -1 && element.word !== word) {
                    returnArr.push(element.word);
                }
            }
            let randomI = Math.floor(Math.random() * returnArr.length);
            let table = returnArr[randomI]
            return table.word
        }

    }

    private getIdiomArray(): Array<IdiomTablel> {
        if (this._idiomArray == null) {
            this._idiomArray = GameFacade.inst.tableRes.getTableAllRes(TableEnum.Idiom) as Array<IdiomTablel>;
        }

        return this._idiomArray;
    }

}