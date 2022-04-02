const {ccclass, property} = cc._decorator;

@ccclass
export default class UIController extends cc.Component {

    private static instance: UIController = null;
    public static getInstance() {return this.instance};

    @property(cc.Label)
    runDistanceLabel: cc.Label = null;

    @property(cc.Node)
    hearts: cc.Node = null;

    @property(cc.Node)
    gameOverDialog: cc.Node = null;

    @property(cc.Label)
    bestScoreLbl: cc.Label = null;

    @property(cc.Node)
    respawnText: cc.Node = null;

    @property(cc.Node)
    tutorialText: cc.Node = null;

    private currentScore: number = 0;

    onLoad(): void {
        UIController.instance = this;
    }

    updateUI(data) {
        const {life, distance} = data;
        if (life) {
            this.hearts.children.forEach(h => h.children[1].active = false);
            for (var i = 0; i < life; i++) {
                this.hearts.children[i].children[1].active = true;
            }
        }
        if (distance) {
            var meter = Math.floor(distance / 38);
            this.currentScore = meter;
            this.runDistanceLabel.string = "Score: " + meter.toString().padStart(7, '0');
        }
    }

    showTutorialText() {
        this.tutorialText.scaleX = 0;
        this.tutorialText.scaleY = 0;
        this.tutorialText.active = true;
        cc.tween(this.tutorialText).to(0.25, {scaleX: 1.0, scaleY: 1.0}).start();

        this.scheduleOnce(() => {
            this.hideTutorialText();
        }, 2);
    }

    hideTutorialText() {
        cc.tween(this.tutorialText).to(0.25, {scaleX: 0.0, scaleY: 0.0}).start();
    }

    showRespawnText() {
        this.respawnText.scaleX = 0;
        this.respawnText.scaleY = 0;
        this.respawnText.active = true;
        cc.tween(this.respawnText).to(0.25, {scaleX: 1.0, scaleY: 1.0}).start();
    }

    hideRespawnText() {
        cc.tween(this.respawnText).to(0.25, {scaleX: 0.0, scaleY: 0.0}).start();
    }

    calculateBestScore() {
        let bestScore = localStorage.getItem("bestScore") || 0;
        if (this.currentScore > bestScore) {
            bestScore = this.currentScore;
            localStorage.setItem("bestScore", bestScore.toString());
        }
        this.bestScoreLbl.string = bestScore.toString();
    }

    showGameOverDialog() {
        this.calculateBestScore();
        this.gameOverDialog.scaleX = 0;
        this.gameOverDialog.scaleY = 0;
        this.gameOverDialog.active = true;
        cc.tween(this.gameOverDialog).to(0.25, {scaleX: 1.0, scaleY: 1.0}).start();
    }

    onPlayAgain() {
        cc.tween(this.gameOverDialog).to(0.25, {scaleX: 0, scaleY: 0}).call(() => {
            const lastScene = cc.director.getScene();
            cc.tween(lastScene).to(0.5, {opacity: 0}).call(() => {
                cc.director.loadScene("JumpingTurtle", () => {
                    lastScene.parent = null;
                    lastScene.destroy();
                });
            }).start();
        }).start();
        
    }

    onBackToMainMenu() {
        cc.tween(this.gameOverDialog).to(0.25, {scaleX: 0, scaleY: 0}).call(() => {
            const lastScene = cc.director.getScene();
            cc.tween(lastScene).to(0.5, {opacity: 0}).call(() => {
                cc.director.loadScene("Title", () => {
                    lastScene.parent = null;
                    lastScene.destroy();
                });
            }).start();
        }).start();
    }
}