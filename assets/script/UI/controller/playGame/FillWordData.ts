import { StageFillWordItem } from "../../../profile/StageProfile";


export class FillWordData {
    // str
    private _word: string = "";
    private _index: number = 0;
    private _posIndex: number = 0;
    initWithProfile(profile: StageFillWordItem) {
        this._word = profile.word;
        this._index = profile.index;
        this._posIndex = profile.posIndex;
    }

    initWithStageTable(word: string, index: number, pos: number) {
        this._word = word;
        this._index = index;
        this._posIndex = pos;
    }
}