import AudioManager from "./AudioManager";
import SpawnAbleObjs from "./SpawnAbleObjs";
import SpawnObj from "./SpawnObj";
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


    @property(AudioManager)
    audioManager: AudioManager = null;

    @property(cc.Node)
    warningNode: cc.Node = null;

    @property(cc.Camera)
    movingCamera: cc.Camera = null;

    @property()
    minDistance: number = 1500;

    @property(TurtleController)
    turtle: TurtleController = null

    @property(SpawnObj)
    SpawnObjArr: SpawnObj[] = []

    private SpawnAbleObjsConfig = [];

    private timeToSpawn = 0;
    private lastBG: cc.Node = null;
    private lastGround: cc.Node = null;

    private spawnedObjects: cc.Node[] = [];
    private delaySpawnTimeCount: number = 0;
    public lastXPosition: number = 0;

    readonly DELAY_SPAWN_DURATION = 3.5;

    start () {
        GamePlayerController.instance = this;
        cc.view.on('canvas-resize', () => {
            this.updateCamera();
        });
        this.updateCamera();
        this.resetGamePlay();
    }

    updateCamera() {
        const canvas = cc.find("Canvas");
        this.movingCamera.node.width = canvas.width;
        this.movingCamera.node.height = canvas.height;
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
        this.SpawnAbleObjsConfig = [];
        this.SpawnObjArr.forEach((object: SpawnObj) => {
            this.SpawnAbleObjsConfig.push({
                type: object.node.name,
                currentTime: object.timeToSpawn,
                spawnTime: object.timeToSpawn,
                offset: object.offset,
                rate: object.rateToSpawn,
                node: object.node,
                skipNextSpawn: object.skipNextSpawn,
                isStaticObject: object.isStaticObject,
                isObstacle: object.isObstacle,
                isDecoration: object.isDecoration
            })
        })
    }

    private spawnObjects(dt) {
        const camera = this.movingCamera;
        if (this.delaySpawnTimeCount > 0) {
            this.delaySpawnTimeCount -= dt * TurtleController.getInstance().speedScale();
        }
        this.SpawnAbleObjsConfig.forEach(config => {
            if ((this.delaySpawnTimeCount > 0) && config.isObstacle) return;
            // The spawn time decrease base on a half of turtle current speed scale.
            config.currentTime -= dt * TurtleController.getInstance().speedScale();
            if (config.currentTime <= 0) {
                if (Math.random() > config.rate) {
                    config.currentTime = config.spawnTime;
                    return;
                }

                let targetX = this.movingCamera.node.x + this.movingCamera.node.width + 100;

                if (!config.isStaticObject) {
                    targetX += 1500 * TurtleController.getInstance().speedScale();
                }

                if (!config.isDecoration && targetX - this.lastXPosition < this.minDistance * TurtleController.getInstance().speedScale() / 1.4) {
                    return;
                } 


                if (!config.isDecoration) {
                    this.lastXPosition = targetX;
                }

                const cloneObject = cc.instantiate(config.node) as cc.Node;
                cloneObject.active = true;
                cloneObject.x = targetX // this.movingCamera.node.x + this.movingCamera.node.width + 100;

                if (config.offset.y > 0) {
                    cloneObject.y = cloneObject.y - Math.random() * config.offset.y;
                }

                if (!config.isStaticObject) {
                    this.warningNode.active = true;
                    this.warningNode.y = this.warningNode.parent.convertToNodeSpaceAR(cloneObject.convertToWorldSpaceAR(cc.v2(0, 0))).y; //this.warningNode.convertToNodeSpaceAR(cloneObject.convertToWorldSpaceAR(cc.v2(0, 0))).y;
                    // Mark this variable to not spawn other object.
                    this.lastXPosition = cloneObject.x;
                }

                config.node.parent.addChild(cloneObject);

                this.spawnedObjects.push(cloneObject);
                if (config.skipNextSpawn) {
                    this.delaySpawnTimeCount = this.DELAY_SPAWN_DURATION;
                }

                config.currentTime = config.spawnTime;
                
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

    getWorldPos(node: cc.Node): cc.Vec2 {
        return node.convertToWorldSpaceAR(cc.v2(0, 0));
    }

    setWorldPos(node: cc.Node, posWS: cc.Vec2): void {
        node.setPosition(node.parent.convertToNodeSpaceAR(posWS));
    }

    private  spawnBackground(start = false) {
        var bg = cc.instantiate(this.backgroundPrefab);
        bg.x = start ? 0 : this.lastBG.x + this.lastBG.width;
        bg.y = start ? 0 : this.lastBG.y;
        this.backgroundParent.addChild(bg);
        this.lastBG = bg;

        var ground = cc.instantiate(this.groudnPrefab);
        ground.x = start ? 0 : this.lastGround.x + this.lastGround.width;
        ground.y = start ? 0 : this.lastGround.y;
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

        const camera = this.movingCamera;
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
