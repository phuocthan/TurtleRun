
const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderboardDialog extends cc.Component {

    private fakeData = [
        {name: 'Alex', score: 35000},
        {name: 'Nhat', score: 999},
        {name: 'Cindy', score: 10000},
        {name: 'Rachel', score: 20000},
        {name: 'Tom', score: 3523},
        {name: 'Jerry', score: 2000},
    ]

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.Prefab)
    rankItem: cc.Prefab = null;

    start () {
        this.scrollView.content.removeAllChildren();
        let localUser = null;
        if (localStorage.getItem('playerName')) {
            localUser = {
                name: localStorage.getItem('playerName'),
                score: Number(localStorage.getItem('bestScore')),
                isYou: true
            }
        }
        const allUser = [...this.fakeData];
        if (localUser) allUser.push(localUser);
        allUser.sort((a, b) => {return b.score - a.score});
        allUser.forEach((user, index) => {
            const rankItem = cc.instantiate(this.rankItem);
            rankItem.children[0].getComponent(cc.Label).string = `#${index + 1}. ${user.name}`;
            rankItem.children[1].getComponent(cc.Label).string = `${user.score}`;
            if (user['isYou']) {
                rankItem.color = new cc.Color(218, 248, 140);
            }
            this.scrollView.content.addChild(rankItem);
        })
    }

    
}
