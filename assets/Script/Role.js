cc.Class({
    extends: cc.Component,

    properties: {
        spriteFrames: {
            default: [ ],
            type: cc.SpriteFrame,
        },
        changeParticle : {
            default : null,
            type : cc.ParticleSystem
        },
        cueSprite : {
            default: null,
            type: cc.Node
        },
        willRoleId : 0,  //0 dog 1 person 2 singledog
        currentRoleId : -1,
        intervalTime : 5,
        duralTime : 0,
        
    },

    // use this for initialization
    onLoad: function () {
        //随机产生一个初始化角色
        if(cc.game.dogover)
            return;
        this.randomRoleType();
        if(this.willRoleId == -1){
            return;
        }
        var roleSprite = this.node.getComponent(cc.Sprite);
        let willChangeSprite;
        switch (this.willRoleId) {
            case 0 : //dog
                // roleSprite.spriteFrame = this.spriteFrames[0];
                willChangeSprite = this.spriteFrames[0];
            break;
            
            case 1 : // person
                // roleSprite.spriteFrame = this.spriteFrames[1];
                willChangeSprite = this.spriteFrames[1];
            break;
            
            case 2 : //singledog
                // roleSprite.spriteFrame = this.spriteFrames[2];
                willChangeSprite = this.spriteFrames[2];
            break;
        }
        var cueSpriteCom = this.cueSprite.getComponent(cc.Sprite);//提示节点的精灵组件
        cueSpriteCom.spriteFrame = null;
        roleSprite.spriteFrame = willChangeSprite;
        this.currentRoleId = this.willRoleId;




        this.schedule(this.changeRoleSpriteFram , this.intervalTime);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.duralTime += dt;
        if(this.duralTime > this.intervalTime){
            let type = this.randomRoleType(dt);
            if(type != -1){
                this.changeRoleSpriteFram();
                this.duralTime = 0;
            }
        }
        
    },
    
    up : function(){
        
    },
    
    down : function(){
        
    },
    
    dead : function(){
        
    },
    
    changeRoleSpriteFram : function(){
        if(cc.game.dogover)
            return;
        this.randomRoleType();
        if(this.willRoleId == -1){
            return;
        }
        var roleSprite = this.node.getComponent(cc.Sprite);
        let willChangeSprite;
        switch (this.willRoleId) {
            case 0 : //dog
                // roleSprite.spriteFrame = this.spriteFrames[0];
                willChangeSprite = this.spriteFrames[0];
            break;
            
            case 1 : // person
                // roleSprite.spriteFrame = this.spriteFrames[1];
                willChangeSprite = this.spriteFrames[1];
            break;
            
            case 2 : //singledog
                // roleSprite.spriteFrame = this.spriteFrames[2];
                willChangeSprite = this.spriteFrames[2];
            break;
        }
        // this.changeParticle.active = true;
        this.changeParticle.resetSystem();
        var cueSpriteCom = this.cueSprite.getComponent(cc.Sprite);//提示节点的精灵组件
        cueSpriteCom.spriteFrame = willChangeSprite;
        this.scheduleOnce(function(){
            cueSpriteCom.spriteFrame = null;
        } , 0.5);
        this.scheduleOnce(function() {
            // this.changeParticle.active = false;
            this.changeParticle.stopSystem();
            roleSprite.spriteFrame = willChangeSprite;
            this.currentRoleId = this.willRoleId;
        }, 1.5);
        
    },
    randomRoleType : function(dt){
        let type = -1;
        type = Math.floor((Math.random() * 3));
        this.willRoleId = type;
        return type;
    }
});
