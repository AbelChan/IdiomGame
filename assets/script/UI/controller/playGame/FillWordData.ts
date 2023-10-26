import { StageFillWordItem } from "../../../profile/StageProfile";


export class FillWordData {
    // str
    private _word: string = "";
    // anwser index
    private _index: number = 0;
    // 位置 position index
    private _posIndex: number = 0;
    initWithProfile(profile: StageFillWordItem) {
        this._word = profile.word;
        this._index = profile.index;
        this._posIndex = profile.posIndex;
    }

    initWithStageTable(word: string, index: number) {
        this._word = word;
        this._index = index;
        this._posIndex = index;
    }

    get word(): string {
        return this._word;
    }

    get index(): number {
        return this._index;
    }

    get posIndex(): number {
        return this._posIndex;
    }
}