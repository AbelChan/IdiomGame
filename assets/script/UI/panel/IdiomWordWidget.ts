import { _decorator, CCInteger, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('IdiomWordWidget')
export class IdiomWordWidget extends Component {
    @property({ type: CCInteger, group: "pos" })
    posx: number = 0
    @property({ type: CCInteger, group: "pos" })
    posy: number = 0
    @property(Node)
    emptyImg: Node = null!;
    @property(Node)
    wordImg: Node = null!
    @property(Label)
    wordLabel: Label = null!



    start() {

    }

    update(deltaTime: number) {

    }


}


