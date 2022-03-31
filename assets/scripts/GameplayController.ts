import SpawnableObject from "./SpawnableObject";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayerController extends cc.Component {

    readonly timeToSpawnNewBackground = 1; // 1 second.

    @property(cc.Node)
    background1: cc.Node = null;

    @property(cc.Node)
    groundNode: cc.Node = null;

    @property([SpawnableObject])
    spawnableObjects: SpawnableObject[] = [];

    private spawnableObjectConfig = [];

    private timeToSpawn = 0;
    private lastBG: cc.Node = null;
    private lastGround: cc.Node = null;

    start () {
        this.lastBG = this.background1;
        this.lastGround = this.groundNode;
        this.spawnBackground();
        this.setupToSpawnObjects();
    }

    private setupToSpawnObjects() {
        this.spawnableObjectConfig = [];
        this.spawnableObjects.forEach((object: SpawnableObject) => {
            this.spawnableObjectConfig.push({
                currentTime: object.timeToSpawn,
                spawnTime: object.timeToSpawn,
                rate: object.rateToSpawn,
                node: object.node
            })
        })
    }

    private spawnObjects(dt) {
        this.spawnableObjectConfig.forEach(config => {
            config.currentTime -= dt;
            if (config.currentTime <= 0) {
                config.currentTime = config.spawnTime;
                if (Math.random() >  config.rate) {
                    return;
                }
                const cloneObject = cc.instantiate(config.node);
                cloneObject.active = true;
                cloneObject.x = cc.Camera.main.node.x + 2000 + Math.random() * 1000;
                config.node.parent.addChild(cloneObject);
                console.log("Spawn", config.node.name);

            }
        })
    }

    private spawnBackground() {
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

        // To Do: Destroy ground & background node.
    }

    update (dt) {
        this.timeToSpawn -= dt;
        if (this.timeToSpawn <= 0) {
            this.spawnBackground();
            this.timeToSpawn = this.timeToSpawnNewBackground;
        }
        this.spawnObjects(dt);
    }
}
