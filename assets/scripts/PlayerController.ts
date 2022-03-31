const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    readonly JUMP_POWER = 700000 * 8;
    readonly SECOND_JUMP_POWER = 700000 * 6;
    readonly GRAVITY = -6000;

    readonly MAX_SPEED = 500;
    readonly MIN_SPEED = 200;
    readonly SPEED_INCREASE = 50;
    readonly SPEED_INCREASE_DURATION = 2;
    
    private rigidBody: cc.RigidBody = null;

    private isJumping: boolean = false;
    private allowDoubleJump: boolean = true;
    private isDoubleJumping: boolean = false;
    private jumpPressed: boolean = false;

    private currentSpeed: number = this.MIN_SPEED;
    private timeToIncreaseSpeed: number = this.SPEED_INCREASE_DURATION;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rigidBody = this.getComponent(cc.RigidBody);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, this.GRAVITY);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = false;

    }

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);


    }

    onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        this.isJumping = false;
        this.isDoubleJumping = false;
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
        this.updateMove(dt);
        this.checkPlayerDie();
    }

    updateMove(dt) {
        const camera = cc.Camera.main;
        
        this.timeToIncreaseSpeed -= dt;
        if (this.timeToIncreaseSpeed <= 0) {
            this.timeToIncreaseSpeed = this.SPEED_INCREASE_DURATION;
            this.currentSpeed += this.SPEED_INCREASE;
            this.currentSpeed = Math.min(this.currentSpeed, this.MAX_SPEED);
        }

        camera.node.x += this.currentSpeed * dt;
        if (this.rigidBody.linearVelocity.x < this.currentSpeed) {
            this.rigidBody.applyForceToCenter(cc.v2(20000, 0), true);
        }
    }

    checkPlayerDie() {
        const camera = cc.Camera.main;
        if (this.node.x <= camera.node.x - camera.node.width/2 - 700) {
            this.node.x = camera.node.x;
        }
    }

    jump(power) {
        this.rigidBody.applyForceToCenter(cc.v2(0, power), true);
    }

    // update (dt) {}
}
