const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    private static instance: AudioManager = null;
    public static getInstance() {return this.instance};

    @property(cc.AudioClip)
    click: cc.AudioClip = null;

    @property(cc.AudioClip)
    jump: cc.AudioClip = null;

    @property(cc.AudioClip)
    die: cc.AudioClip = null;

    @property(cc.AudioClip)
    hit: cc.AudioClip = null;

    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    @property(cc.AudioClip)
    crow: cc.AudioClip = null;

    @property(cc.AudioClip)
    revive: cc.AudioClip = null;

    protected onLoad(): void {
        AudioManager.instance = this;
    }

    start () {

    }

    play(id: string, loop: boolean = false, volume: number = 1.0) {
        return cc.audioEngine.play(this[id], loop, volume);
    }

    playMusic(id, loop: boolean = true) {
        this.stopMusic();
        cc.audioEngine.playMusic(this[id], loop);
    }

    stopMusic() {
        cc.audioEngine.stopMusic();
    }

}
