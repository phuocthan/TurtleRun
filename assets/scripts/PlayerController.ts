import UIController from "./GameUIController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerController extends cc.Component {

    private static instance = null;
    public static getInstacne() {return this.instance};

    @property(cc.Node)
    barrierNode: cc.Node = null;
    @property(cc.Node)
    touchNode: cc.Node = null;

    readonly JUMP_POWER = 950000 * 8;
    readonly SECOND_JUMP_POWER = 300000 * 6;
    readonly GRAVITY = -8000;

    readonly MAX_SPEED = 400 * 2;
    readonly MIN_SPEED = 300;
    readonly SPEED_INCREASE = 50;
    readonly SPEED_INCREASE_DURATION = 1.25;

    readonly PLAYER_LIFE = 3;
    
    private rigidBody: cc.RigidBody = null;

    private isJumping: boolean = false;
    private allowDoubleJump: boolean = true;
    private isDoubleJumping: boolean = false;
    private jumpPressed: boolean = false;

    private currentSpeed: number = this.MIN_SPEED;
    private timeToIncreaseSpeed: number = this.SPEED_INCREASE_DURATION;

    private runDistance: number = 0;
    private runLastXPosition: number = null;

    private currentPlayerLife: number = this.PLAYER_LIFE;
    private isDead: boolean = false;
    private respawning: boolean = false;

    private invincibleDuration: number = 0;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        PlayerController.instance = this;

        this.rigidBody = this.getComponent(cc.RigidBody);
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, this.GRAVITY);
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = false;

    }

    start () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown.bind(this), this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp.bind(this), this);

        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this), this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this), this);

        cc.view.on('canvas-resize', () => {
            this.updateCamera();
        })
        this.updateCamera();
        this.resetGamePlay();
    }

    resetGamePlay() {
        cc.Camera.main.node.x = 0;
        cc.Camera.main.node.y = 0;
        this.node.x = 0;
        this.node.y = 0;
        this.rigidBody.linearVelocity = cc.v2(0, 0);

        this.currentSpeed = this.MIN_SPEED;
        this.runDistance = 0;
        this.runLastXPosition = null;
        this.currentPlayerLife = this.PLAYER_LIFE;
        this.isDead = false;
        this.respawning = false;
        this.isJumping = false;
        this.allowDoubleJump = true;
        this.jumpPressed = false;
        this.node.opacity = 255;
        console.log(this.node);

        UIController.getInstance().updateUI({life: this.currentPlayerLife, runDistance: this.runDistance});

        UIController.getInstance().showTutorialText();
    }

    updateCamera() {
        cc.Camera.main.node.width = cc.view.getCanvasSize().width;
        cc.Camera.main.node.height = cc.view.getCanvasSize().height;
    }

    onBeginContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        this.isJumping = false;
        this.isDoubleJumping = false;
        // Collide with bird
        switch(otherCollider.tag) {
        case 1:
            if (!this.isInvincible()) {
                this.onPlayerDamage();
            }
            otherCollider.node.destroy();
            break;
        case 2:
            if (!this.isInvincible()) {
                this.onPlayerDamage();
            }
            break;
        default:
            break;
        }

    }

    onEndContact (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        // will be called once when the contact between two colliders just about to end.
    }
    onPreSolve (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        // will be called every time collider contact should be resolved
    }

    onPostSolve (contact: cc.PhysicsContact, selfCollider: cc.Collider, otherCollider: cc.Collider) {
        // will be called every time collider contact should be resolved
    }

    canJump() {
        if (this.jumpPressed) return false;
        if (this.allowDoubleJump && !this.isDoubleJumping) return true;
        return !this.isJumping;
    }

    onPressJump() {
        if (this.respawning) {
            return this.respawn();
        }
        if (!this.canJump()) return;
        var power = this.JUMP_POWER;
        if (this.isJumping && this.allowDoubleJump) {
            this.isDoubleJumping = true;
            power = this.SECOND_JUMP_POWER;
        }
        this.isJumping = true;
        this.jumpPressed = true;

        this.jump(power);
    }

    onKeyDown(event){
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.onPressJump();
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

    onTouchStart() {
        this.onPressJump();
    }

    onTouchEnd() {
        this.jumpPressed = false;
    }

    jump(power) {
        this.rigidBody.applyForceToCenter(cc.v2(0, power), true);
    }
    
    checkPlayerOutOfScreen() {
        if (this.respawning) return;
        const camera = cc.Camera.main;
        if (this.node.x + this.node.width / 2 <= camera.node.x - camera.node.width/2) {
            this.onPlayerDamage();
        }
    }

    onPlayerDamage() {

        cc.tween(this.node).to(0.25, {opacity: 0}).start();
        this.currentPlayerLife -= 1;

        UIController.getInstance().updateUI({life: this.currentPlayerLife});

        if (this.currentPlayerLife <= 0) {
            this.onPlayerDie();
        } else {
            this.respawning = true;
            UIController.getInstance().showRespawnText();
        }
    }

    onPlayerDie() {
        if (this.isDead) return;
        this.isDead = true;
        UIController.getInstance().showGameOverDialog();
    }

    respawn() {
        this.node.opacity = 0;
        cc.tween(this.node).to(0.25, {opacity: 255}).start();
        const camera = cc.Camera.main;
        this.node.active = true;
        this.node.x = camera.node.x - camera.node.width * 0.2;
        this.node.y = -230;
        this.rigidBody.linearVelocity = cc.v2(this.currentSpeed, 0);
        this.respawning = false;
        UIController.getInstance().hideRespawnText();
        this.invincibleDuration = 3;
        cc.tween(this.barrierNode).to(0.25, {opacity: 255}).delay(this.invincibleDuration - 0.5).to(0.25, {opacity: 0}).start();
    }

    isInvincible() {
        return this.invincibleDuration > 0;
    }

    protected update(dt: number): void {
        this.updateMove(dt);
        this.checkPlayerOutOfScreen();
    }

    updateMove(dt) {
        const camera = cc.Camera.main;

        if (this.invincibleDuration > 0) {
            this.invincibleDuration -= dt;
        }
        
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

        if (!this.isDead && !this.respawning) {
            if (this.runLastXPosition === null) {
                this.runLastXPosition = this.node.x;
            } else {
                const diff = this.node.x - this.runLastXPosition;
                this.runDistance += diff > 0 ? this.node.x - this.runLastXPosition : 0;
                this.runLastXPosition = this.node.x;
                UIController.getInstance().updateUI({distance: this.runDistance});
            }
        }
        
    }

    // update (dt) {}
}
