const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    readonly GROUND_Y = -155.371;
    readonly JUMP_POWER = 100;
    readonly GRAVITY = 10;

    private velocity = {x: 0, y: 0};

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };

    onKeyDown(event){
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.jump();
            default:
                break;
        }
    }

    protected update(dt: number): void {
        if (this.node.y > this.GROUND_Y) {
            this.velocity.y += this.GRAVITY * dt;
        } else {
            this.velocity.y = 0;
            this.node.y = this.GROUND_Y;
        }
        this.node.y += this.velocity.y * dt;
        console.log(this.velocity, this.node.y);
    }

    jump() {
        this.velocity.y += this.JUMP_POWER;
        console.log("OK?");
    }

    
}
