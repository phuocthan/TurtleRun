import AdsManager from "./AdsManager";
import AudioManager from "./AudioManager";
import { GAME_VERSION } from "./Version";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartMenuDialog extends cc.Component {

    @property(cc.Node)
    leaderboardDialog: cc.Node = null;

    @property(cc.Label)
    bestScoreLbl: cc.Label = null;

    @property(cc.EditBox)
    nameEditBox: cc.EditBox = null;

    @property(cc.Label)
    playerNameLbl: cc.Label = null;

    @property(cc.Label)
    versionLbl: cc.Label = null;
    @property(cc.Label)
    mustInputNameLbl: cc.Label = null;

    start () {
        this.showVersion();
        this.showUserInfo();

        AudioManager.getInstance().playMusic('bgm');
        // AdsManager.inst.showBanner();
    }

    showVersion() {
        this.versionLbl.string = GAME_VERSION;
    }

    showUserInfo() {
        this.playerNameLbl.node.active = false;
        this.mustInputNameLbl.node.active = false;
        this.bestScoreLbl.string = localStorage.getItem("bestScore") || "0";
        let playerName = localStorage.getItem("playerName");
        if (playerName) {
            this.nameEditBox.string = playerName;
            this.onFinishEnterName();
        }
    }

    onBeginEnterName() {
        this.mustInputNameLbl.node.active = false;
    }

    onFinishEnterName() {
        if (this.nameEditBox.string.length === 0) {
            this.mustInputNameLbl.node.active = true;
            return
        }
        this.nameEditBox.node.active = false;
        this.playerNameLbl.string = this.nameEditBox.string;
        this.playerNameLbl.node.active = true;
        localStorage.setItem("playerName", this.playerNameLbl.string);
    }

    playClickSE() {
        AudioManager.getInstance().play('click', false, 1.0);
    }

    onStartGame() {
        if( cc.sys.isMobile && cc.sys.os === cc.sys.OS_ANDROID) {
            jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showBannerAd", "()V");
        }

        this.playClickSE();
        if (!localStorage.getItem("playerName")) {
            this.mustInputNameLbl.node.active = true;
            return;
        }
        const lastScene = cc.director.getScene();
        cc.director.loadScene("JumpingTurtle", () => {
            lastScene.parent = null;
            lastScene.destroy();
        });
        // AdsManager.inst.cacheInterstitial();
        // AdsManager.inst.showInterstitial();
    }

    onLeaderboard() {
        this.playClickSE();
        this.leaderboardDialog.scaleX = 0;
        this.leaderboardDialog.scaleY = 0;
        this.leaderboardDialog.active = true;
        cc.tween(this.leaderboardDialog).to(0.25, {scaleX: 1.0, scaleY: 1.0}).start();
    }

    closeLeaderboard() {
        this.playClickSE();
        cc.tween(this.leaderboardDialog).to(0.25, {scaleX: 0, scaleY: 0}).call(() => {
            this.leaderboardDialog.active = false;
        }).start();
    }

}
