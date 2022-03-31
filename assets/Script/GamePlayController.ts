const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayController extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    start () {
        // init logic
        this.label.string = this.text;
    }
}
