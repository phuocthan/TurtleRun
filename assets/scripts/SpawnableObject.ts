import AudioManager from "./AudioManager";
import GamePlayerController from "./GameplayController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SpawnableObject extends cc.Component {
    @property()
    timeToSpawn: number = 2;
    @property
    rateToSpawn: number = 1;
    @property()
    offset: cc.Vec2 = cc.v2(0, 0);
    @property()
    velocity: cc.Vec2 = cc.v2(0, 0);
    @property()
    skipNextSpawn: boolean = false;

    private isSoundPlayed: boolean = false;
    private soundID: number = -1;

    protected update(dt: number): void {
        this.node.x += this.velocity.x * dt;
        this.node.y += this.velocity.y * dt;

        if (this.node.name === 'Bird' && !this.isSoundPlayed) {
            const camera = cc.Camera.main;
            if (this.node.x - this.node.width / 2 <= camera.node.x + camera.node.width / 2) {
                this.soundID = AudioManager.getInstance().play('crow');
                this.isSoundPlayed = true;
                GamePlayerController.getInstance().warningNode.active = false;
            }
        }
    }

    protected onDestroy(): void {
        if (this.soundID !== -1) {
            cc.audioEngine.stop(this.soundID);
        }
    }
}