const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayController extends cc.Component {

    @property(cc.Node)
    playerController: cc.Node = null;

    start () {
        
    };


}
