const {ccclass, property} = cc._decorator;

@ccclass
export default class StartMenuDialog extends cc.Component {

    readonly GAME_VERSION: string = 'v1.1';

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

    start () {
        this.showVersion();
        this.showUserInfo();
    }

    showVersion() {
        this.versionLbl.string = this.GAME_VERSION;
    }

    showUserInfo() {
        this.bestScoreLbl.string = localStorage.getItem("bestScore") || "0";
        let playerName = localStorage.getItem("playerName");
        if (playerName) {
            this.nameEditBox.string = playerName;
            this.onFinishEnterName();
        }
    }

    onFinishEnterName() {
        this.nameEditBox.node.active = false;
        this.playerNameLbl.string = this.nameEditBox.string;
        this.playerNameLbl.node.active = true;
        localStorage.setItem("playerName", this.playerNameLbl.string);
    }

    onStartGame() {
        if (!localStorage.getItem("playerName")) {
            return;
        }
        const lastScene = cc.director.getScene();
        cc.director.loadScene("JumpingTurtle", () => {
            lastScene.parent = null;
            lastScene.destroy();
        });
    }

    onLeaderboard() {
        this.leaderboardDialog.scaleX = 0;
        this.leaderboardDialog.scaleY = 0;
        this.leaderboardDialog.active = true;
        cc.tween(this.leaderboardDialog).to(0.25, {scaleX: 1.0, scaleY: 1.0}).start();
    }

    closeLeaderboard() {
        cc.tween(this.leaderboardDialog).to(0.25, {scaleX: 0, scaleY: 0}).call(() => {
            this.leaderboardDialog.active = false;
        }).start();
    }

}
