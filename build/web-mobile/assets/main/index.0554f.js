window.__require=function t(e,o,n){function r(a,c){if(!o[a]){if(!e[a]){var s=a.split("/");if(s=s[s.length-1],!e[s]){var l="function"==typeof __require&&__require;if(!c&&l)return l(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+a+"'")}a=s}var p=o[a]={exports:{}};e[a][0].call(p.exports,function(t){return r(e[a][1][t]||t)},p,p.exports,t,e,o,n)}return o[a].exports}for(var i="function"==typeof __require&&__require,a=0;a<n.length;a++)r(n[a]);return r}({GameUIController:[function(t,e,o){"use strict";cc._RF.push(e,"24586YUbTNBFLMaOklXiiPW","GameUIController");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a};Object.defineProperty(o,"__esModule",{value:!0});var a=cc._decorator,c=a.ccclass,s=a.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.runDistanceLabel=null,e.hearts=null,e.gameOverDialog=null,e.bestScoreLbl=null,e.respawnText=null,e.tutorialText=null,e.currentScore=0,e}var o;return r(e,t),o=e,e.getInstance=function(){return this.instance},e.prototype.onLoad=function(){o.instance=this},e.prototype.updateUI=function(t){var e=t.life,o=t.distance;if(null!=e){this.hearts.children.forEach(function(t){return t.children[1].active=!1});for(var n=0;n<e;n++)this.hearts.children[n].children[1].active=!0}if(null!=o){var r=Math.floor(o/38);this.currentScore=r,this.runDistanceLabel.string="Score: "+r.toString().padStart(7,"0")}},e.prototype.showTutorialText=function(){var t=this;this.tutorialText.scaleX=0,this.tutorialText.scaleY=0,this.tutorialText.active=!0,cc.tween(this.tutorialText).to(.25,{scaleX:1,scaleY:1}).start(),this.scheduleOnce(function(){t.hideTutorialText()},2)},e.prototype.hideTutorialText=function(){cc.tween(this.tutorialText).to(.25,{scaleX:0,scaleY:0}).start()},e.prototype.showRespawnText=function(){this.respawnText.scaleX=0,this.respawnText.scaleY=0,this.respawnText.active=!0,cc.tween(this.respawnText).to(.25,{scaleX:1,scaleY:1}).start()},e.prototype.hideRespawnText=function(){cc.tween(this.respawnText).to(.25,{scaleX:0,scaleY:0}).start()},e.prototype.calculateBestScore=function(){var t=localStorage.getItem("bestScore")||0;this.currentScore>t&&(t=this.currentScore,localStorage.setItem("bestScore",t.toString())),this.bestScoreLbl.string=t.toString()},e.prototype.showGameOverDialog=function(){this.calculateBestScore(),this.gameOverDialog.scaleX=0,this.gameOverDialog.scaleY=0,this.gameOverDialog.active=!0,cc.tween(this.gameOverDialog).to(.25,{scaleX:1,scaleY:1}).start()},e.prototype.onPlayAgain=function(){cc.tween(this.gameOverDialog).to(.25,{scaleX:0,scaleY:0}).call(function(){var t=cc.director.getScene();cc.tween(t).to(.5,{opacity:0}).call(function(){cc.director.loadScene("JumpingTurtle",function(){t.parent=null,t.destroy()})}).start()}).start()},e.prototype.onBackToMainMenu=function(){cc.tween(this.gameOverDialog).to(.25,{scaleX:0,scaleY:0}).call(function(){var t=cc.director.getScene();cc.tween(t).to(.5,{opacity:0}).call(function(){cc.director.loadScene("Title",function(){t.parent=null,t.destroy()})}).start()}).start()},e.instance=null,i([s(cc.Label)],e.prototype,"runDistanceLabel",void 0),i([s(cc.Node)],e.prototype,"hearts",void 0),i([s(cc.Node)],e.prototype,"gameOverDialog",void 0),i([s(cc.Label)],e.prototype,"bestScoreLbl",void 0),i([s(cc.Node)],e.prototype,"respawnText",void 0),i([s(cc.Node)],e.prototype,"tutorialText",void 0),o=i([c],e)}(cc.Component);o.default=l,cc._RF.pop()},{}],GameplayController:[function(t,e,o){"use strict";cc._RF.push(e,"8ed59RdH29Kpr+RNDLG1IPS","GameplayController");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a};Object.defineProperty(o,"__esModule",{value:!0});var a=t("./SpawnableObject"),c=t("./TurtleController"),s=cc._decorator,l=s.ccclass,p=s.property,u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.timeToSpawnNewBackground=.25,e.backgroundPrefab=null,e.groudnPrefab=null,e.backgroundParent=null,e.dynamicBackgroundParent=null,e.obstacleParent=null,e.spawnableObjects=[],e.spawnableObjectConfig=[],e.timeToSpawn=0,e.lastBG=null,e.lastGround=null,e.spawnedObjects=[],e}var o;return r(e,t),o=e,e.getInstance=function(){return this.instance},e.prototype.start=function(){var t=this;o.instance=this,this.resetGamePlay(),cc.view.on("canvas-resize",function(){t.updateCamera()}),this.updateCamera()},e.prototype.updateCamera=function(){cc.Camera.main.node.width=cc.view.getCanvasSize().width,cc.Camera.main.node.height=cc.view.getCanvasSize().height},e.prototype.resetGamePlay=function(){this.lastBG=null,this.lastGround=null,this.backgroundParent.destroyAllChildren(),this.spawnedObjects.forEach(function(t){return t.destroy()}),this.spawnedObjects=[],this.timeToSpawn=0,this.spawnBackground(!0),this.spawnBackground(!1),this.setupToSpawnObjects()},e.prototype.setupToSpawnObjects=function(){var t=this;this.spawnableObjectConfig=[],this.spawnableObjects.forEach(function(e){t.spawnableObjectConfig.push({currentTime:e.timeToSpawn,spawnTime:e.timeToSpawn,offset:e.offset,rate:e.rateToSpawn,node:e.node})})},e.prototype.spawnObjects=function(t){var e=this,o=cc.Camera.main;this.spawnableObjectConfig.forEach(function(o){if(o.currentTime-=t*c.default.getInstance().speedScale()/2,o.currentTime<=0){if(o.currentTime=o.spawnTime,Math.random()>o.rate)return;var n=cc.instantiate(o.node);n.active=!0,n.x=cc.Camera.main.node.x+2e3+1e3*Math.random(),o.offset.y>0&&(n.y=n.y+-o.offset.y+Math.random()*o.offset.y*2),o.node.parent.addChild(n),e.spawnedObjects.push(n)}});var n=[];this.spawnedObjects&&this.spawnedObjects.forEach(function(t){t&&(t.x+t.width/2<o.node.x-o.node.width/2-200?t.destroy():n.push(t))}),this.spawnedObjects=n},e.prototype.spawnBackground=function(t){void 0===t&&(t=!1);var e=cc.instantiate(this.backgroundPrefab);e.x=t?0:this.lastBG.x+this.lastBG.width,e.y=t?0:this.lastBG.y,this.backgroundParent.addChild(e),this.lastBG=e;var o=cc.instantiate(this.groudnPrefab);if(o.x=t?0:this.lastGround.x+this.lastGround.width,o.y=t?-424:this.lastGround.y,this.backgroundParent.addChild(o),this.lastGround=o,t){var n=cc.instantiate(this.backgroundPrefab);n.x=this.lastBG.x-this.lastBG.width,n.y=this.lastBG.y,this.backgroundParent.addChild(n);var r=cc.instantiate(this.groudnPrefab);r.x=this.lastGround.x-this.lastGround.width,r.y=this.lastGround.y,this.backgroundParent.addChild(r)}},e.prototype.update=function(t){this.timeToSpawn-=t,this.timeToSpawn<=0&&(this.spawnBackground(),this.timeToSpawn=this.timeToSpawnNewBackground);var e=cc.Camera.main;this.backgroundParent.children.forEach(function(t){!t.remain&&t.x+t.width/2<e.node.x-e.node.width/2-200&&t.destroy()}),this.spawnObjects(t)},e.instance=null,i([p(cc.Prefab)],e.prototype,"backgroundPrefab",void 0),i([p(cc.Prefab)],e.prototype,"groudnPrefab",void 0),i([p(cc.Node)],e.prototype,"backgroundParent",void 0),i([p(cc.Node)],e.prototype,"dynamicBackgroundParent",void 0),i([p(cc.Node)],e.prototype,"obstacleParent",void 0),i([p([a.default])],e.prototype,"spawnableObjects",void 0),o=i([l],e)}(cc.Component);o.default=u,cc._RF.pop()},{"./SpawnableObject":"SpawnableObject","./TurtleController":"TurtleController"}],LeaderboardDialog:[function(t,e,o){"use strict";cc._RF.push(e,"9e54c3NMdVFXpi5k7ZkkJLR","LeaderboardDialog");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a},a=this&&this.__spreadArrays||function(){for(var t=0,e=0,o=arguments.length;e<o;e++)t+=arguments[e].length;var n=Array(t),r=0;for(e=0;e<o;e++)for(var i=arguments[e],a=0,c=i.length;a<c;a++,r++)n[r]=i[a];return n};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,s=c.ccclass,l=c.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.fakeData=[{name:"Alex",score:35e3},{name:"Nhat",score:999},{name:"Cindy",score:1e4},{name:"Rachel",score:2e4},{name:"Tom",score:3523},{name:"Jerry",score:2e3}],e.scrollView=null,e.rankItem=null,e}return r(e,t),e.prototype.start=function(){var t=this;this.scrollView.content.removeAllChildren();var e=null;localStorage.getItem("playerName")&&(e={name:localStorage.getItem("playerName"),score:Number(localStorage.getItem("bestScore")),isYou:!0});var o=a(this.fakeData);e&&o.push(e),o.sort(function(t,e){return e.score-t.score}),o.forEach(function(e,o){var n=cc.instantiate(t.rankItem);n.children[0].getComponent(cc.Label).string="#"+(o+1)+". "+e.name,n.children[1].getComponent(cc.Label).string=""+e.score,e.isYou&&(n.color=new cc.Color(218,248,140)),t.scrollView.content.addChild(n)})},i([l(cc.ScrollView)],e.prototype,"scrollView",void 0),i([l(cc.Prefab)],e.prototype,"rankItem",void 0),i([s],e)}(cc.Component);o.default=p,cc._RF.pop()},{}],SpawnableObject:[function(t,e,o){"use strict";cc._RF.push(e,"04296UuByRKrafVPlQtTrZD","SpawnableObject");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a};Object.defineProperty(o,"__esModule",{value:!0});var a=cc._decorator,c=a.ccclass,s=a.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.timeToSpawn=2,e.rateToSpawn=1,e.offset=cc.v2(0,0),e.velocity=cc.v2(0,0),e}return r(e,t),e.prototype.update=function(t){this.node.x+=this.velocity.x*t,this.node.y+=this.velocity.y*t},i([s()],e.prototype,"timeToSpawn",void 0),i([s],e.prototype,"rateToSpawn",void 0),i([s()],e.prototype,"offset",void 0),i([s()],e.prototype,"velocity",void 0),i([c],e)}(cc.Component);o.default=l,cc._RF.pop()},{}],StartMenuDialog:[function(t,e,o){"use strict";cc._RF.push(e,"e438f6ggLlFyqFyLqwudh+F","StartMenuDialog");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a};Object.defineProperty(o,"__esModule",{value:!0});var a=cc._decorator,c=a.ccclass,s=a.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.leaderboardDialog=null,e.bestScoreLbl=null,e.nameEditBox=null,e.playerNameLbl=null,e}return r(e,t),e.prototype.start=function(){this.showUserInfo()},e.prototype.showUserInfo=function(){this.bestScoreLbl.string=localStorage.getItem("bestScore")||"0";var t=localStorage.getItem("playerName");t&&(this.nameEditBox.string=t,this.onFinishEnterName())},e.prototype.onFinishEnterName=function(){this.nameEditBox.node.active=!1,this.playerNameLbl.string=this.nameEditBox.string,this.playerNameLbl.node.active=!0,localStorage.setItem("playerName",this.playerNameLbl.string)},e.prototype.onStartGame=function(){if(localStorage.getItem("playerName")){var t=cc.director.getScene();cc.director.loadScene("JumpingTurtle",function(){t.parent=null,t.destroy()})}},e.prototype.onLeaderboard=function(){this.leaderboardDialog.scaleX=0,this.leaderboardDialog.scaleY=0,this.leaderboardDialog.active=!0,cc.tween(this.leaderboardDialog).to(.25,{scaleX:1,scaleY:1}).start()},e.prototype.closeLeaderboard=function(){var t=this;cc.tween(this.leaderboardDialog).to(.25,{scaleX:0,scaleY:0}).call(function(){t.leaderboardDialog.active=!1}).start()},i([s(cc.Node)],e.prototype,"leaderboardDialog",void 0),i([s(cc.Label)],e.prototype,"bestScoreLbl",void 0),i([s(cc.EditBox)],e.prototype,"nameEditBox",void 0),i([s(cc.Label)],e.prototype,"playerNameLbl",void 0),i([c],e)}(cc.Component);o.default=l,cc._RF.pop()},{}],TurtleController:[function(t,e,o){"use strict";cc._RF.push(e,"27ba4KNOW1K/aVqU6T8WG8s","TurtleController");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a};Object.defineProperty(o,"__esModule",{value:!0});var a=t("./GameUIController"),c=cc._decorator,s=c.ccclass,l=c.property,p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.GROUND_Y_POSITION=-370,e.PLAYER_LIFE=3,e.touchNode=null,e.barrierNode=null,e.speed=cc.v2(0,0),e.maxSpeed=cc.v2(2e3,2e3),e.gravity=-1e3,e.drag=1e3,e.maxDrag=3e3,e.dragStep=100,e.dragStepIncreaseDuration=1.5,e.direction=1,e.jumpSpeed=300,e.doubleJumpSpeed=1e3,e.collisionX=0,e.collisionY=0,e.jumping=!0,e.touchingNumber=0,e.cameraSpeed=0,e.doubleJumping=!1,e.dragStepIncreaseCount=0,e.runDistance=0,e.runLastXPosition=null,e.currentPlayerLife=e.PLAYER_LIFE,e.isDead=!1,e.respawning=!1,e.invincibleDuration=0,e}var o;return r(e,t),o=e,e.getInstance=function(){return this.instance},e.prototype.onLoad=function(){o.instance=this,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),this.touchNode.on(cc.Node.EventType.TOUCH_START,this.onTouchStart.bind(this),this)},e.prototype.start=function(){a.default.getInstance().updateUI({distance:this.runDistance,life:this.currentPlayerLife}),a.default.getInstance().showTutorialText()},e.prototype.onTouchStart=function(){this.onPressJump()},e.prototype.onEnable=function(){cc.director.getCollisionManager().enabled=!0},e.prototype.onDisable=function(){cc.director.getCollisionManager().enabled=!1},e.prototype.onKeyDown=function(t){switch(t.keyCode){case cc.macro.KEY.space:this.onPressJump()}},e.prototype.onCollisionEnter=function(t,e){if(!this.checkCollideWithObjects(t)){this.touchingNumber++;var o=t.world.aabb,n=t.world.preAabb.clone(),r=e.world.aabb,i=e.world.preAabb.clone();if(i.x=r.x,n.x=o.x,cc.Intersection.rectRect(i,n))return this.speed.x<0&&i.xMax>n.xMax?(this.node.x=n.xMax-this.node.parent.x,this.collisionX=-1):this.speed.x>0&&i.xMin<n.xMin&&(this.node.x=n.xMin-i.width-this.node.parent.x,this.collisionX=1),this.speed.x=0,void(t.touchingX=!0);i.y=r.y,n.y=o.y,cc.Intersection.rectRect(i,n)&&(this.speed.y<0&&i.yMax>n.yMax?(this.node.y=n.yMax-this.node.parent.y,this.jumping=!1,this.doubleJumping=!1,this.collisionY=-1):this.speed.y>0&&i.yMin<n.yMin&&(this.node.y=n.yMin-i.height-this.node.parent.y,this.collisionY=1),this.speed.y=0,t.touchingY=!0)}},e.prototype.onCollisionExit=function(t){this.touchingNumber--,0===this.touchingNumber&&(this.node.color=cc.Color.WHITE),t.touchingX?(this.collisionX=0,t.touchingX=!1):t.touchingY&&(t.touchingY=!1,this.collisionY=0,this.jumping=!0,this.doubleJumping=!0)},e.prototype.onPressJump=function(){this.respawning?this.respawn():this.jumping?this.doubleJumping||(this.speed.y+=this.doubleJumpSpeed,this.speed.y=this.speed.y>this.maxSpeed.y?this.maxSpeed.y:this.speed.y,this.doubleJumping=!0):(this.jumping=!0,this.speed.y=this.jumpSpeed>this.maxSpeed.y?this.maxSpeed.y:this.jumpSpeed)},e.prototype.speedScale=function(){return this.cameraSpeed/600},e.prototype.update=function(t){if(this.dragStepIncreaseCount<this.dragStepIncreaseDuration?this.dragStepIncreaseCount+=t:(this.maxSpeed.x+=this.dragStep,this.maxSpeed.x=Math.min(this.maxSpeed.x,this.maxDrag),this.dragStepIncreaseCount=0),this.jumping&&(this.speed.y+=this.gravity*t,Math.abs(this.speed.y)>this.maxSpeed.y&&(this.speed.y=this.speed.y>0?this.maxSpeed.y:-this.maxSpeed.y)),this.speed.x+=(this.direction>0?1:-1)*this.drag*t,this.cameraSpeed+=(this.direction>0?1:-1)*this.drag*t,Math.abs(this.speed.x)>this.maxSpeed.x&&(this.speed.x=this.speed.x>0?this.maxSpeed.x:-this.maxSpeed.x),Math.abs(this.cameraSpeed)>this.maxSpeed.x&&(this.cameraSpeed=this.cameraSpeed>0?this.maxSpeed.x:-this.cameraSpeed),this.speed.x*this.collisionX>0&&(this.speed.x=0),this.node.x+=this.speed.x*t,this.node.y+=this.speed.y*t,this.speed.y<=0&&this.node.y<=this.GROUND_Y_POSITION&&(this.node.y=this.GROUND_Y_POSITION,this.jumping=!1,this.doubleJumping=!1,this.collisionY=-1),cc.Camera.main.node.x+=this.cameraSpeed*t,!this.isDead&&!this.respawning)if(null===this.runLastXPosition)this.runLastXPosition=this.node.x;else{var e=this.node.x-this.runLastXPosition;this.runDistance+=e>0?this.node.x-this.runLastXPosition:0,this.runLastXPosition=this.node.x,a.default.getInstance().updateUI({distance:this.runDistance})}this.checkPlayerOutOfScreen(),this.invincibleDuration>0&&(this.invincibleDuration-=t)},e.prototype.checkPlayerOutOfScreen=function(){if(!this.respawning&&!this.isDead){var t=cc.Camera.main;this.node.x+this.node.width/2<=t.node.x-t.node.width/2&&this.onPlayerDamage()}},e.prototype.checkCollideWithObjects=function(t){if(this.isDead||this.respawning)return!1;switch(t.node.group){case"Bird":if(t.node.destroy(),!this.isInvincible())return this.onPlayerDamage(),!0;break;case"Box":if(!this.isInvincible())return this.onPlayerDamage(),!0}return!1},e.prototype.onPlayerDamage=function(){cc.tween(this.node).to(.25,{opacity:0}).start(),this.currentPlayerLife-=1,a.default.getInstance().updateUI({life:this.currentPlayerLife}),this.currentPlayerLife<=0?this.onPlayerDie():(this.respawning=!0,a.default.getInstance().showRespawnText())},e.prototype.onPlayerDie=function(){this.isDead||(this.isDead=!0,a.default.getInstance().showGameOverDialog())},e.prototype.respawn=function(){this.node.opacity=0,cc.tween(this.node).to(.25,{opacity:255}).start();var t=cc.Camera.main;this.node.active=!0,this.node.x=t.node.x-.2*t.node.width,this.node.y=this.GROUND_Y_POSITION,this.speed.x=this.cameraSpeed,this.respawning=!1,a.default.getInstance().hideRespawnText(),this.invincibleDuration=3,cc.tween(this.barrierNode).to(.25,{opacity:255}).delay(this.invincibleDuration-.5).to(.25,{opacity:0}).start()},e.prototype.isInvincible=function(){return this.invincibleDuration>0},e.instance=null,i([l(cc.Node)],e.prototype,"touchNode",void 0),i([l(cc.Node)],e.prototype,"barrierNode",void 0),i([l()],e.prototype,"speed",void 0),i([l()],e.prototype,"maxSpeed",void 0),i([l()],e.prototype,"gravity",void 0),i([l()],e.prototype,"drag",void 0),i([l()],e.prototype,"maxDrag",void 0),i([l()],e.prototype,"dragStep",void 0),i([l()],e.prototype,"dragStepIncreaseDuration",void 0),i([l()],e.prototype,"direction",void 0),i([l()],e.prototype,"jumpSpeed",void 0),i([l()],e.prototype,"doubleJumpSpeed",void 0),o=i([s],e)}(cc.Component);o.default=p,cc._RF.pop()},{"./GameUIController":"GameUIController"}],UIController:[function(t,e,o){"use strict";cc._RF.push(e,"97b37rmqndJeoQ362Zxpdra","UIController");var n,r=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),i=this&&this.__decorate||function(t,e,o,n){var r,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,o,n);else for(var c=t.length-1;c>=0;c--)(r=t[c])&&(a=(i<3?r(a):i>3?r(e,o,a):r(e,o))||a);return i>3&&a&&Object.defineProperty(e,o,a),a};Object.defineProperty(o,"__esModule",{value:!0});var a=cc._decorator,c=a.ccclass,s=a.property,l=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.label=null,e.text="hello",e}return r(e,t),e.prototype.start=function(){},i([s(cc.Label)],e.prototype,"label",void 0),i([s],e.prototype,"text",void 0),i([c],e)}(cc.Component);o.default=l,cc._RF.pop()},{}]},{},["GameUIController","GameplayController","LeaderboardDialog","SpawnableObject","StartMenuDialog","TurtleController","UIController"]);