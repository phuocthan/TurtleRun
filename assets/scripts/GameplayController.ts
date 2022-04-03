import SpawnableObject from "./SpawnableObject";
import TurtleController from "./TurtleController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GamePlayerController extends cc.Component {

    private static instance: GamePlayerController = null;
    public static getInstance() {return this.instance};

    readonly timeToSpawnNewBackground = 0.25; // 1 second.

    @property(cc.Prefab)
    backgroundPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    groudnPrefab: cc.Prefab = null;

    @property(cc.Node)
    backgroundParent: cc.Node = null;

    @property(cc.Node)
    dynamicBackgroundParent: cc.Node = null;

    @property(cc.Node)
    obstacleParent: cc.Node = null;

    @property([SpawnableObject])
    spawnableObjects: SpawnableObject[] = [];

    private spawnableObjectConfig = [];

    private timeToSpawn = 0;
    private lastBG: cc.Node = null;
    private lastGround: cc.Node = null;

    start () {
        GamePlayerController.instance = this;
        this.resetGamePlay();
        cc.view.on('canvas-resize', () => {
            this.updateCamera();
        });
        this.updateCamera();
    }

    updateCamera() {
        cc.Camera.main.node.width = cc.view.getCanvasSize().width;
        cc.Camera.main.node.height = cc.view.getCanvasSize().height;
    }

    resetGamePlay() {
        this.lastBG = null;
        this.lastGround = null;
        this.backgroundParent.destroyAllChildren();
        this.spawnedObjects.forEach(object => object.destroy());
        this.spawnedObjects = [];
        this.timeToSpawn = 0;
        this.spawnBackground(true);
        this.spawnBackground(false);
        this.setupToSpawnObjects();
    }

    private setupToSpawnObjects() {
        this.spawnableObjectConfig = [];
        this.spawnableObjects.forEach((object: SpawnableObject) => {
            this.spawnableObjectConfig.push({
                currentTime: object.timeToSpawn,
                spawnTime: object.timeToSpawn,
                offset: object.offset,
                rate: object.rateToSpawn,
                node: object.node
            })
        })
    }

    private spawnedObjects: cc.Node[] = [];

    private spawnObjects(dt) {
        const camera = cc.Camera.main;
        this.spawnableObjectConfig.forEach(config => {
            // The spawn time decrease base on a half of turtle current speed scale.
            config.currentTime -= dt * TurtleController.getInstance().speedScale();
            if (config.currentTime <= 0) {
                config.currentTime = config.spawnTime;
                if (Math.random() > config.rate) {
                    return;
                }
                const cloneObject = cc.instantiate(config.node);
                cloneObject.active = true;
                cloneObject.x = cc.Camera.main.node.x + 2000 + Math.random() * 1000;

                if (config.offset.y > 0) {
                    cloneObject.y = cloneObject.y + -config.offset.y + Math.random() * config.offset.y * 2;
                }

                config.node.parent.addChild(cloneObject);
                this.spawnedObjects.push(cloneObject);
            }
        })

        const newSpawnObjects = [];
        this.spawnedObjects && this.spawnedObjects.forEach(node => {
            if (!node) return;
            const offset = 200;
            try {
                if (node.x + node.width / 2 < camera.node.x - camera.node.width / 2 - offset) {
                    node.destroy();
                } else {
                    newSpawnObjects.push(node);
                }
            } catch(err) {
                node.destroy();
            }
            
        })
        this.spawnedObjects = newSpawnObjects;
    }

    private  spawnBackground(start = false) {
        var bg = cc.instantiate(this.backgroundPrefab);
        bg.x = start ? 0 : this.lastBG.x + this.lastBG.width;
        bg.y = start ? 0 : this.lastBG.y;
        this.backgroundParent.addChild(bg);
        this.lastBG = bg;

        var ground = cc.instantiate(this.groudnPrefab);
        ground.x = start ? 0 : this.lastGround.x + this.lastGround.width;
        ground.y = start ? -424 : this.lastGround.y;
        this.backgroundParent.addChild(ground);

        this.lastGround = ground;

        if (start) {
            // Quick fix: Spawn left area of the screen at the beginning.
            const bg = cc.instantiate(this.backgroundPrefab);
            bg.x = this.lastBG.x - this.lastBG.width;
            bg.y = this.lastBG.y;
            this.backgroundParent.addChild(bg);

            const ground = cc.instantiate(this.groudnPrefab);
            ground.x = this.lastGround.x - this.lastGround.width;
            ground.y = this.lastGround.y;
            this.backgroundParent.addChild(ground);
        }

    }

    update (dt) {

        this.timeToSpawn -= dt;
        if (this.timeToSpawn <= 0) {
            this.spawnBackground();
            this.timeToSpawn = this.timeToSpawnNewBackground;
        }

        const camera = cc.Camera.main;
        // Destroy background & ground
        this.backgroundParent.children.forEach(node => {
            const offset = 200;
            if (!node['remain'] && node.x + node.width / 2 < camera.node.x - camera.node.width / 2 - offset) {
                node.destroy();
            }
        })
        this.spawnObjects(dt);

    }
}
