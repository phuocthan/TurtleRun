import AudioManager from "./AudioManager";
import GamePlayerController from "./GameplayController";
import UIController from "./GameUIController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TurtleController extends cc.Component {

    private static instance: TurtleController = null;
    public static getInstance() {return this.instance};

    readonly GROUND_Y_POSITION: number = -320.505;
    readonly PLAYER_LIFE: number = 3;

    @property(cc.Node)
    touchNode: cc.Node = null;
    @property(cc.Node)
    barrierNode: cc.Node = null;
    @property()
    speed: cc.Vec2 = cc.v2(0, 0);
    @property()
    maxSpeed: cc.Vec2 = cc.v2(2000, 2000);
    @property()
    gravity: number = -1000;
    @property()
    drag: number = 1000;
    @property()
    maxDrag: number = 3000;
    @property()
    dragStep: number = 100;
    @property()
    dragStepIncreaseDuration: number = 1.5;
    @property()
    direction: number = 1;
    @property()
    jumpSpeed: number = 300;
    @property()
    doubleJumpSpeed: number = 1000;

    private collisionX: number = 0;
    private collisionY: number = 0;
    private jumping: boolean = true;
    private touchingNumber: number = 0;
    private cameraSpeed: number = 0;

    private doubleJumping: boolean = false;

    private dragStepIncreaseCount: number = 0;

    private runDistance: number = 0;
    private runLastXPosition: number = null;

    private currentPlayerLife: number = this.PLAYER_LIFE;
    private isDead: boolean = false;
    private respawning: boolean = false;

    private invincibleDuration: number = 0;

    private animationController: cc.Animation = null;
    protected onLoad(): void {
        TurtleController.instance = this;
        this.animationController = this.getComponent(cc.Animation);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this), this);
    }
    
    protected start(): void {
        UIController.getInstance().updateUI({distance: this.runDistance, life: this.currentPlayerLife});
        UIController.getInstance().showTutorialText();
        this.resetPosition();
    }

    onTouchStart() {
        this.onPressJump();
    }

    onEnable() {
        cc.director.getCollisionManager().enabled = true;
    }

    onDisable() {
        cc.director.getCollisionManager().enabled = false;
    }

    onKeyDown(event){
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.onPressJump();
            default:
                break;
        }
    }

    onCollisionEnter(other, self) {
        var result = this.checkCollideWithObjects(other);
        if (result) return;

        this.touchingNumber ++;
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();

        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();

        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && (selfPreAabb.xMax > otherPreAabb.xMax)) {
                this.node.x = otherPreAabb.xMax - this.node.parent.x;
                this.collisionX = -1;
            }
            else if (this.speed.x > 0 && (selfPreAabb.xMin < otherPreAabb.xMin)) {
                this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
                this.collisionX = 1;
            }

            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && (selfPreAabb.yMax > otherPreAabb.yMax)) {
                this.node.y = otherPreAabb.yMax - this.node.parent.y;
                this.jumping = false;
                this.doubleJumping = false;
                this.collisionY = -1;
                this.animationController.play("walk");
            }
            else if (this.speed.y > 0 && (selfPreAabb.yMin < otherPreAabb.yMin)) {
                this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
                this.collisionY = 1;
            }
            this.speed.y = 0;
            other.touchingY = true;
            
        }    
        
    }

    onCollisionExit(other) {
        this.touchingNumber --;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }

        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
            this.jumping = true;
            this.doubleJumping = true;
        }
    }

    onPressJump() {
        if (this.respawning) {
            this.respawn();
            return;
        }
        if (!this.jumping) {
            this.jumping = true;
            this.speed.y = this.jumpSpeed > this.maxSpeed.y ? this.maxSpeed.y : this.jumpSpeed;
            this.animationController.play("jump");
            AudioManager.getInstance().play("jump");
        } else {
            if (!this.doubleJumping) {
                this.speed.y = this.doubleJumpSpeed;
                this.doubleJumping = true;
                this.animationController.play("doubleJump");
                AudioManager.getInstance().play("jump");
            }
        }
    }

    speedScale() {
        return this.cameraSpeed / 600;
    }
    
    update(dt) {
        // Update to crease max speed base on time.
        if (!this.isDead && !this.respawning) {
            if (this.dragStepIncreaseCount < this.dragStepIncreaseDuration) {
                this.dragStepIncreaseCount += dt;
            } else {
                this.maxSpeed.x += this.dragStep;
                this.maxSpeed.x = Math.min(this.maxSpeed.x, this.maxDrag);
                this.dragStepIncreaseCount = 0;
            }
        }
        // Update to apply gravity
        if (this.jumping) {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }
        // Update Speed
        this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
        this.cameraSpeed += (this.direction > 0 ? 1 : -1) * this.drag * dt;
        if (Math.abs(this.speed.x) > this.maxSpeed.x) {
            this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
        }
        if (Math.abs(this.cameraSpeed) > this.maxSpeed.x) {
            this.cameraSpeed = this.cameraSpeed > 0 ? this.maxSpeed.x : -this.cameraSpeed;
        }
        // Reset speed to zero when hit something horizontally
        if (this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
        }
        // Update player position base on speed.
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
        // Check if player has touched the ground or not.
        if (this.speed.y <= 0 && (this.node.y < this.GROUND_Y_POSITION)) {
            if (this.jumping) {
               this.animationController.play("walk");
            }
            this.node.y = this.GROUND_Y_POSITION;
            this.jumping = false;
            this.doubleJumping = false;
            this.collisionY = -1;
        }
        // Update Camera position.
        const camera = GamePlayerController.getInstance().movingCamera;
        camera.node.x += this.cameraSpeed * dt;
        // Update to calculate run distance
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
        // Check player is out of screen
        this.checkPlayerOutOfScreen();
        // Update invincible
        if (this.invincibleDuration > 0) {
            this.invincibleDuration -= dt;
        }
    }

    checkPlayerOutOfScreen() {
        if (this.respawning || this.isDead) return;
        const camera = GamePlayerController.getInstance().movingCamera;
        if (this.node.x + this.node.width / 2 <= camera.node.x - camera.node.width/2) {
            AudioManager.getInstance().play('hit');
            this.onPlayerDamage();
        }
    }

    checkCollideWithObjects(otherCollider: cc.Collider) {
        if (this.isDead || this.respawning) return false;

        switch(otherCollider.node.group) {
            case 'Bird':
                AudioManager.getInstance().play('hit');
                otherCollider.node.destroy();
                if (!this.isInvincible()) {
                    this.onPlayerDamage();
                    return true;
                } else {
                    this.speed.x = this.cameraSpeed;
                }
                break;
            case 'Box':
                if (!this.isInvincible()) {
                    AudioManager.getInstance().play('hit');
                    this.onPlayerDamage();
                }
                return true;
            case 'Scarecrow':
                if (!this.isInvincible()) {
                    AudioManager.getInstance().play('hit');
                    this.onPlayerDamage();
                }
                return true;
            default:
                break;
            }
        return false;
    }

    onPlayerDamage() {
        cc.tween(this.node).to(0.1, {opacity: 0}).start();
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
        AudioManager.getInstance().play('die');
    }

    resetPosition() {
        const camera = GamePlayerController.getInstance().movingCamera;
        this.node.active = true;
        this.node.x = camera.node.x - camera.node.width * 0.2;
        this.node.y = this.GROUND_Y_POSITION;
    }

    respawn() {
        this.node.opacity = 0;
        cc.tween(this.node).to(0.25, {opacity: 255}).start();
        this.resetPosition();
        this.speed.x = this.cameraSpeed;
        this.respawning = false;
        UIController.getInstance().hideRespawnText();
        this.invincibleDuration = 3;
        cc.tween(this.barrierNode).to(0.25, {opacity: 255}).delay(this.invincibleDuration - 0.5).to(0.25, {opacity: 0}).start();
        AudioManager.getInstance().play('revive');
    }

    isInvincible() {
        return this.invincibleDuration > 0;
    }

}