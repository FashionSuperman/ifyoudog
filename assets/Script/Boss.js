        var deadCauses_dog = ["吃了巧克力，狗生很得意" , "旺财，你怎么了旺财?","OMG  OVER  IDIOT!!"],
        deadCauses_person_shit = ["干了这晚热翔","暴饮暴食真的不好啊" ,"屎里有毒!!"],
        deadCauses_person_gouliang = ["为啥抢旺财的狗粮？","恩，狗粮真好吃"],
        deadCauses_singledog_shit = ["天啦噜，真把自己当狗了？","屎里有毒!!","旺财都不吃屎了，你还吃?"],
        deadCauses_singledog_chocolate = ["一只单身狗还有脸吃巧克力？","乖，这个太甜了，不适合你"];
var properties = require("Properties");
var netTool = require("Net");
cc.Class({
    extends: cc.Component,

    properties: {
        playerNode : {
            default : null,
            type : cc.Node,
        },
        // scoreContent : {
        //     default : null,
        //     type : cc.Label,
        // },
        windowWidth : 0,
        windowHeight : 0,
        bossv : 0,
        chocolate : "chocolate",
        dogFood : "dogfood",
        shit : "shit",
        rolePowerBar : {
            default : null,
            type : cc.Node,
        },
        powerInterval : 0.05 ,//能量速率
        overContainer : {
            default : null,
            type : cc.Node
        },
        overBack : {
            default : null,
            type : cc.Node
        },
        overTitle : {
            default : null,
            type : cc.Node
        },
        disScore : {
            default : null,
            type : cc.Node
        },
        overContent : {
            default : null,
            type : cc.Node
        }

    },


    

    // use this for initialization
    onLoad: function () {
        this.bossv = 6;

        this.windowWidth = this.node.parent.width;
        this.windowHeight = this.node.parent.height;
        this.playerNode = cc.find("Canvas/roleNode/role");
        // this.scoreContent = cc.find("Canvas/scorecontent").getComponent(cc.Label);
        this.rolePowerBar = cc.find("Canvas/roleNode/rolePower/bar");
        this.overContainer = cc.find("Canvas/overcontainer");
        this.overBack = cc.find("Canvas/overcontainer/overback");

        this.overTitle = cc.find("Canvas/overcontainer/overback/overtitle");
        this.disScore = cc.find("Canvas/overcontainer/overback/disscore");
        this.overContent = cc.find("Canvas/overcontainer/overback/overcontent");
        // this.canvas = cc.find("Canvas");
        this.buttonControlCom = cc.find("buttoncontrol").getComponent("ButtonControl");
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //碰撞检测
        // let hertDis = this.node.width + this.playerNode.width;
        // let dist = cc.pDistance(this.playerNode.position, this.node.position);
        // if(dist < hertDis - 20){
        //     this.node.parent.getComponent("Game").bossPool.put(this.node,this.node);
        //     this.node.removeFromParent();
        // }
        if(!cc.game.dogover){
            this.node.x -= this.bossv;
            if(this.node.x < (-this.windowWidth/2 - 20)){ //缓存
                this.node.parent.getComponent("Game").bossPool.put(this.node,this.node);
                this.node.removeFromParent();
            }

            if(cc.game.hungry){//饿死
                this.gameOver();
            }
        }
        
    },
    onCollisionEnter: function (other, self) {

        if(cc.game.dogover){
            return;
        }

        // this.scoreContent.string = self.node._name;
        //吃到该吃的加分，否则，游戏结束
        let currentBossName = self.node._name;
        cc.game.currentBossName = currentBossName;
        let currentRoleId = this.playerNode.getComponent("Role").currentRoleId;

        switch(currentRoleId){
            case 0://dog
                if(this.chocolate == currentBossName){
                    //TODO 游戏结束
                    this.gameOver();
                }else{
                    //加能量
                    this.addPower();
                    this.node.parent.getComponent("Game").bossPool.put(this.node,this.node);
                    this.node.removeFromParent();
                }
                break;
            case 1://person
                if(this.chocolate == currentBossName){
                    //加能量
                    this.addPower();
                    this.node.parent.getComponent("Game").bossPool.put(this.node,this.node);
                    this.node.removeFromParent();
                }else{
                    //TODO 游戏结束
                    this.gameOver();
                }
                break;
            case 2://singleDog
                if(this.dogFood == currentBossName){
                     this.addPower();
                     this.node.parent.getComponent("Game").bossPool.put(this.node,this.node);
                     this.node.removeFromParent();
                }else{
                    //TODO 游戏结束 
                    this.gameOver();

                }
        }
         
        
    },
    addPower : function(){

        let currentPow = this.rolePowerBar.scaleX;//当前能量
        let willPow = currentPow + this.powerInterval;
        willPow = willPow > 2 ? 2 : willPow;
        this.rolePowerBar.scaleX = willPow;
        if(cc.game.music){
            cc.audioEngine.playEffect(this.buttonControlCom.gaint);
        }
        
    },
    initGameOverData : function(){
        var roleCom = this.playerNode.getComponent("Role");
        //头像
        this.overTitle.getComponent(cc.Sprite).spriteFrame = roleCom.spriteFrames[roleCom.currentRoleId];
        //距离
        this.disScore.getComponent(cc.Label).string = cc.game.currentDis + "m";

        //判断距离分数是否刷新纪录,刷新,后台纪录
        if( (cc.game.currentDis > cc.game.score) && cc.game.login){
            //纪录新的分数
            cc.game.score = cc.game.currentDis;
            netTool.sendRequest(properties.url.updateUserScore,"POST",{"score":cc.game.currentDis},function(data){

            });
        }

        let currentBossName = cc.game.currentBossName;
        //说明
        var deadCauseString = "";
        if(cc.game.hungry){
            deadCauseString = "没有查克拉了";
            return deadCauseString;
        }
        if(roleCom.currentRoleId == 0){//dog 
           deadCauseString = this.randomDeadString(deadCauses_dog);
        }else if(roleCom.currentRoleId == 1){//person
            if(currentBossName == this.shit){
                deadCauseString = this.randomDeadString(deadCauses_person_shit);
            }else if(currentBossName == this.dogFood){
                deadCauseString = this.randomDeadString(deadCauses_person_gouliang);
            }
        }else if(roleCom.currentRoleId == 2){//singledog
            if(currentBossName == this.chocolate){
                deadCauseString = this.randomDeadString(deadCauses_singledog_chocolate);
            }else if(currentBossName == this.shit){
                deadCauseString = this.randomDeadString(deadCauses_singledog_shit);
            }
        }
        this.overContent.getComponent(cc.Label).string = deadCauseString;
    },
    gameOver : function(){
        cc.game.dogover = true;
        this.initGameOverData();
        //play effect
        cc.audioEngine.stopMusic();
        if(cc.game.music){
            cc.audioEngine.playEffect(this.buttonControlCom.dead);
        }
        

        this.overContainer.zIndex = 10;
        this.overContainer.x = 0;
        this.overContainer.y = 0;
        cc.game.gameovershow = true;
        var anim = this.overBack.getComponent(cc.Animation);
        anim.play('gameover');

        //显式广告：
        // this.scheduleOnce(this.showAD,0.3);
    },
    randomDeadString : function(deadarr){
        var length = deadarr.length;
        var index = Math.floor((Math.random() * length));
        return deadarr[index];
    },
    showAD:function(){
        var ads_manager = anysdk.agentManager.getAdsPlugin();
        if ( ads_manager.isAdTypeSupported(anysdk.AdsType.AD_TYPE_FULLSCREEN) ) {
            ads_manager.showAds(anysdk.AdsType.AD_TYPE_FULLSCREEN);
          
        }else{
      
        }
    }
});
