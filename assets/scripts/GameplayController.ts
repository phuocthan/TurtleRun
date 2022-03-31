// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    background1: cc.Node = null;

    @property(cc.Node)
    groundNode: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    timeToSpawn = 0;
    lastBG: cc.Node = null;
    lastGround: cc.Node = null;

    start () {
        this.lastBG = this.background1;
        this.lastGround = this.groundNode;
    }

    update (dt) {
        this.timeToSpawn -= dt;
        console.log(this.timeToSpawn);
        if (this.timeToSpawn <= 0) {
            this.timeToSpawn = 1;
            var bg = cc.instantiate(this.background1);
            bg.x = this.lastBG.x + this.lastBG.width;
            bg.y = this.lastBG.y;
            this.lastBG.parent.addChild(bg);
            this.lastBG = bg;

            var ground = cc.instantiate(this.groundNode);
            ground.x = this.lastGround.x + this.lastGround.width;
            ground.y = this.lastGround.y;
            this.lastGround.parent.addChild(ground);
            this.lastGround = ground;
        }
    }
}
