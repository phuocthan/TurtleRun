const {ccclass, property} = cc._decorator;

@ccclass
export default class SpawnableObject extends cc.Component {
    @property()
    timeToSpawn: number = 2;
    @property
    rateToSpawn: number = 1;
    @property()
    offset: cc.Vec2 = cc.v2(0, 0);
}