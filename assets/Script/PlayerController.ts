const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    readonly GROUND_Y = -155.371;
    readonly JUMP_POWER = 600;
    readonly SECOND_JUMP_POWER = 500;
    readonly GRAVITY = -600;
    
    allowDoubleJump: boolean = true;

    private velocity = {x: 0, y: 0};
    private isJumping: boolean = false;
    private isDoubleJumping: boolean = false;
    
    private jumpPressed: boolean = false;

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
    };

    canJump() {
        if (this.jumpPressed) return false;
        if (this.allowDoubleJump && !this.isDoubleJumping) return true;
        return !this.isJumping;
    }

    onKeyDown(event){
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                if (!this.canJump()) return;
                var power = this.JUMP_POWER;
                if (this.isJumping && this.allowDoubleJump) {
                    this.isDoubleJumping = true;
                    power = this.SECOND_JUMP_POWER;
                }
                this.isJumping = true;
                this.jumpPressed = true;

                this.jump(power);
            default:
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.jumpPressed = false;
            default:
                break;
        }
    }

    protected update(dt: number): void {
        this.node.y += this.velocity.y * dt;
        if (this.node.y > this.GROUND_Y) {
            this.velocity.y += this.GRAVITY * dt;
        } else {
            this.node.y = this.GROUND_Y;
            this.isJumping = false;
            this.isDoubleJumping = false;
        }
    }

    jump(power) {
        this.velocity.y = power;
    }

    
}
