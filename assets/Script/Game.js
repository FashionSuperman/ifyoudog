var bossPool = require("BossPool").BossPool;
cc.Class({
    extends: cc.Component,

    properties: {
        playerNode : {
            default : null,
            type : cc.Node,
        },
        playerAndPowerNode : {
            default : null,
            type : cc.Node,
        },
        disContentNode : {
            default : null,
            type : cc.Label,
        },
        shitPrefab : {
            default : null,
            type : cc.Prefab,
        },
        dogFoodPrefab : {
            default : null,
            type : cc.Prefab,
        },
        chocolatePrefab : {
            default : null,
            type : cc.Prefab,
        },
        rolePowerBar : {
            default : null,
            type : cc.Node,
        },
        disScore : {
            default : null,
            type : cc.Node
        },
        back: {
            default: null,
            url: cc.AudioClip
        },
        paddiongUp : 20,
        paddingDown : 35,
        columnInterval : 0.1,
        rowInterval : 0.3,
        deltaX_new_boss : 0,
        reviseHeight : 12,
        reviseWidth : 15,
        gamev : 0,
        intervalTime : 0.4,
        isUpping : false,
        isDowning : false,
        currentDis : 0 , //距离
        powerMinInterval : 0.001 //能量减少速率


        
    },


    spawNewBoss : function(){
        
        if(Math.random() > this.columnInterval){
            return;
        }
        
        
        if(! this.Bosswidth){
            this.Bosswidth = cc.instantiate(this.shitPrefab).width;
        }
        if(! this.BossHeight){
            this.BossHeight = cc.instantiate(this.shitPrefab).height;
        }
        if(! this.pwidth){
            this.pwidth = this.node.width;
        }
        if(! this.pheight){
            this.pheight = this.node.height;
        }
        
        
        
        let newBossPosX = this.pwidth/2 + this.Bosswidth/2 + this.reviseWidth;
        
        //计算最多产生多少行
        if(! this.wholeRow){
            this.wholeRow = (this.pheight - this.paddingDown - this.paddiongUp) / (this.BossHeight + 2 * this.reviseHeight);
            // this.wholeRow = Math.floor(this.wholeRow) + 1;
        }
        
        //计算首行Boss y坐标 
        if(! this.firstBossY){
            this.firstBossY = 0 + this.pheight/2 - this.BossHeight/2 - this.reviseHeight/2 - this.paddiongUp;
        }
        
        this.deltaX_new_boss = 0;
        var bossPrefab = null;
        

        //产生boss逻辑修改，判断是否有空隙，如果没有空隙，那么要三种类型的boss都至少有一个
        var columnBosss = [];//记录将要产生的这一列boss
        for(let i = 0 ; i < Math.ceil(this.wholeRow) ; i++){
            if(Math.random() <= this.rowInterval){
                var bossType = this.randomBossType();
                bossPrefab = this.bossPool.get(bossType);
                //缓存中没有
                if(! bossPrefab){
                    bossPrefab = cc.instantiate(bossType);
                }
                let newBossPosY = this.firstBossY - i * (this.BossHeight + 2 * this.reviseHeight);
                if(bossPrefab != null){
                    //在预制节点上记录预制节点类型
                    bossPrefab.bossType = bossType;
                    bossPrefab.setPosition(cc.p(newBossPosX , newBossPosY));
                    columnBosss.push(bossPrefab);
                }
            }
        }
        //判断是否有空隙
        if(columnBosss.length == Math.ceil(this.wholeRow)){//没有空隙
            var boosTypeNum = [0,0,0];//记录三种boss的数量,"shit" "chocolate" "dogfood"
            for(let i = 0 ; i < columnBosss.length ; i++){
                let thePrefabType = columnBosss[i].bossType;
                switch(thePrefabType._name){
                    case "shit":
                        boosTypeNum[0]++;
                        break;
                    case "chocolate":
                        boosTypeNum[1]++;
                        break;
                    case "dogfood":
                        boosTypeNum[2]++;
                        break;
                }
            }

            for(let i = 0 ; i < boosTypeNum.length ; i++){
                if(boosTypeNum[i] == 0){//没有当前类型的boss
                    var replace;
                    if(0 == i){
                        var shitpre = this.bossPool.get(this.shitPrefab);
                        if(!shitpre){
                            shitpre = cc.instantiate(this.shitPrefab);
                        }
                        replace = shitpre;
                    }else if(1 == i){
                        var chocolatepre = this.bossPool.get(this.chocolatePrefab);
                        if(!chocolatepre){
                            chocolatepre = cc.instantiate(this.chocolatePrefab);
                        }
                        replace = chocolatepre;
                    }else if(2 == i){
                        var dogfoodpre = this.bossPool.get(this.dogFoodPrefab);
                        if(!dogfoodpre){
                            dogfoodpre = cc.instantiate(this.dogFoodPrefab);
                        }
                        replace = dogfoodpre;
                    }
                    //随机产生一个位置
                    var willReplace;
                    while(true){
                        var index = Math.floor(Math.random() * columnBosss.length);
                        willReplace = columnBosss[index];
                        var has1 = false;
                        var has1Type = null;
                        for(let i = 0 ; i < boosTypeNum.length ; i++){
                            if(boosTypeNum[i] == 1){
                                has1 = true;
                                switch(i){
                                    case 0:
                                        has1Type = "shit";
                                        break;
                                    case 1:
                                        has1Type = "chocolate";
                                        break;
                                    case 2:
                                        has1Type = "dogfood";
                                        break;
                                }
                                break;
                            }
                        }
                        if(has1){
                            if(willReplace._name == has1Type){
                                continue;
                            }else{
                                break;
                            }
                        }else{
                            break;
                        }
                    }
                    


                    replace.setPosition(cc.p(willReplace.x , willReplace.y));
                    columnBosss.splice(index,1,replace);
                }
            }


        }
        

        for(let i = 0 ; i < columnBosss.length ; i++){
            this.node.addChild(columnBosss[i]);
        }



        
    },
    
    randomBossType : function(){
       var result;
       var random = Math.floor(Math.random() * 3 + 1);
       switch(random){
           case 1 :
           result = this.shitPrefab;
           break;
           case 2:
           result = this.chocolatePrefab;
           break;
           case 3:
           result = this.dogFoodPrefab;
           break;
       }
       
       return result;
    },
    // use this for initialization
    onLoad: function () {
    
        // 广告预加载
        // var ads_manager = anysdk.agentManager.getAdsPlugin();
        // ads_manager.preloadAds(anysdk.AdsType.AD_TYPE_FULLSCREEN);

        
        //开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.node.on(cc.Node.EventType.TOUCH_START , this.touchStart , this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE , this.touchMove , this);
        this.node.on(cc.Node.EventType.TOUCH_END , this.touchEnd , this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL , this.touchCancel , this);


        

        //绑定系统back,home事件
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // //绑定后台到前台事件
        // cc.game.on(cc.game.EVENT_SHOW, function () {
        //     if(cc.game.isPaused()){
        //         cc.game.resume();
        //         cc.game.music = true;
        //         cc.audioEngine.playMusic(this.back,true);
        //     }
        // });
        // cc.game.on(cc.game.EVENT_HIDE, function () {
        //     cc.audioEngine.pauseMusic();
        //     cc.audioEngine.pauseAllEffects();
        //     cc.game.music = false;
        //     // cc.game.dogover = true;
        //     cc.game.pause();
        // });
        
        //TODO 产生第一列boss
        let wholePrefads = [];
        wholePrefads.push(this.shitPrefab);
        wholePrefads.push(this.dogFoodPrefab);
        wholePrefads.push(this.chocolatePrefab);
        let nums = [10,10,10];
        // let indexNames = ["shit" , "dogfood" , "chocolate"];
        bossPool.init(wholePrefads,nums);
        this.bossPool = bossPool;
        this.spawNewBoss();
    },

    destroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    //系统返回键 
    onKeyDown : function(event){
        switch(event.keyCode) {
            case cc.KEY.back:
                cc.audioEngine.pauseMusic();
                cc.audioEngine.pauseAllEffects();
                var leavecontainer = cc.find("Canvas/leavecontainer");
                var leavecontent = cc.find("Canvas/leavecontainer/leavecontent");
                var ani = leavecontent.getComponent(cc.Animation);
                leavecontainer.x = 0;
                leavecontainer.y = 0;
                leavecontainer.zIndex = 20;
                ani.play("leaveshow");
                this.scheduleOnce(function(){
                    // cc.game.pause();
                    cc.game.dogover = true;
                    cc.game.music = false;
                },0.2);
                break;
        }
    },

    animUp : function(){
        var anim = this.playerNode.getComponent(cc.Animation);
        anim.play('aniUp');
    },
    animDown : function(){
        var anim = this.playerNode.getComponent(cc.Animation);
        anim.play('aniDown');
    },

    touchStart : function(event){
        if(cc.game.dogover)
            return;
        var y = this.playerNode.y;
        this.animUp();
    },

    touchMove : function(event){
        if(cc.game.dogover)
            return;
        // let currentTouch = event.currentTouch;
        // let prevPoint = currentTouch._prevPoint;
        let prevPoint = event.getPreviousLocation();
        // let point = currentTouch._point;

        let point = event.getLocation();

        let disY = point.y - prevPoint.y;
        if(disY > 0 && !this.isUpping){
            this.unscheduleAllCallbacks();
            this.schedule(this.animUp , this.intervalTime , cc.macro.REPEAT_FOREVER , 0);
            this.isUpping = true;
            this.isDowning = false;
        }else if(disY < 0 && !this.isDowning){
            this.unscheduleAllCallbacks();
            this.schedule(this.animDown , this.intervalTime , cc.macro.REPEAT_FOREVER , 0);
            this.isDowning = true;
            this.isUpping = false;
        }

        let topLimit = this.node.height/2 - this.playerNode.height/2 - this.paddiongUp;
        let downLimit = -this.node.height/2 + this.playerNode.height/2 + this.paddingDown;
        // let willPos = this.playerNode.y + disY;
        let willPos = this.playerAndPowerNode.y + disY;

        

        if((willPos >= downLimit) && (willPos <= topLimit)){
            // this.playerNode.y += disY;
            this.playerAndPowerNode.y += disY;
            this.toplimited = false;
            this.downlimited = false;
        }else if( (disY > 0 && this.downlimited) || (disY < 0 && this.toplimited) ){
            // this.playerNode.y += disY;
            this.playerAndPowerNode.y += disY;
            this.toplimited = false;
            this.downlimited = false;
        }else{
            if(disY > 0){
                // this.playerNode.y = topLimit;
                this.playerAndPowerNode.y = topLimit;
                this.toplimited = true;
                this.downlimited = false;
            }else if(disY < 0){
                // this.playerNode.y = downLimit;
                this.playerAndPowerNode.y = downLimit;
                this.downlimited = true;
                this.toplimited = false;
            }
        }
    },

    touchEnd : function(event){
        this.unscheduleAllCallbacks();
    },

    touchCancel : function(event){
        this.unscheduleAllCallbacks();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(!cc.game.dogover){
            this.deltaX_new_boss += this.gamev;
            if(! this.Bosswidth){
                this.Bosswidth = cc.instantiate(this.shitPrefab).width;
            }
            if(this.deltaX_new_boss >= (this.Bosswidth + this.reviseWidth)){
                this.spawNewBoss();
            }


            
            // this.disContentNode.string = willPos + " top " + topLimit + " down " + downLimit;
            this.currentDis += this.gamev * dt * 0.5;
            cc.game.currentDis = Math.round(this.currentDis);
            this.disContentNode.string = Math.round(this.currentDis) + "m";

            let currentPow = this.rolePowerBar.scaleX;//当前能量
            let willPow = currentPow - this.powerMinInterval;
            willPow = willPow < 0 ? 0 : willPow;
            this.rolePowerBar.scaleX = willPow;
            if(willPow == 0){//能量耗完
                cc.game.hungry = true;
            }


        }
        
    }
});
