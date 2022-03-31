// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    readonly GROUND_Y = -155.371;
    readonly JUMP_POWER = 1400000;
    readonly SECOND_JUMP_POWER = 1000000;
    readonly GRAVITY = -800;
    
    allowDoubleJump: boolean = true;

    private velocity = {x: 0, y: 0};
    private isJumping: boolean = false;
    private isDoubleJumping: boolean = false;
    
    private jumpPressed: boolean = false;

    private rigidBody: cc.RigidBody = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rigidBody = this.getComponent(cc.RigidBody);
        cc.director.getPhysicsManager().enabled = true;
    //    cc.director.getPhysicsManager().debugDrawFlags = 1;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -600);
        cc.director.getCollisionManager().enabled = true;
       cc.director.getCollisionManager().enabledDrawBoundingBox = false;

    }

    onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        // will be called once when two colliders begin to contact
        console.log('onBeginContact');
    }
    onEndContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        // will be called once when the contact between two colliders just about to end.
        console.log('onEndContact');
    }
    onPreSolve (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        // will be called every time collider contact should be resolved
        console.log('onPreSolve');
    }
    onPostSolve (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        // will be called every time collider contact should be resolved
        console.log('onPostSolve');
        this.isJumping = false;
    }

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);
    }

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
        // if (this.rigidBody.linearVelocity.x )
        cc.Camera.main.node.x += 100 * dt;
        if (this.rigidBody.linearVelocity.x < 100) {
            this.rigidBody.applyForceToCenter(cc.v2(10000, 0), true);
        }
    }

    jump(power) {
        this.rigidBody.applyForceToCenter(cc.v2(0, power), true);
    }

    // update (dt) {}
}
