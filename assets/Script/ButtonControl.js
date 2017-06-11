cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        overContainer : {
            default : null,
            type : cc.Node
        },
        overBack : {
            default : null,
            type : cc.Node
        },

        back: {
            default: null,
            url: cc.AudioClip
        },
        dead: {
            default: null,
            url: cc.AudioClip
        },
        gaint: {
            default: null,
            url: cc.AudioClip
        },
        leavecontainer:{
            default : null,
            type : cc.Node
        },
        leavecontent:{
            default : null,
            type : cc.Node
        }

    },

    // use this for initialization
    onLoad: function () {
        cc.game.music = true;
         //back music
        cc.audioEngine.playMusic(this.back,true);

        this.overContainer = cc.find("Canvas/overcontainer");
        // this.overBack = cc.find("Canvas/overcontainer/overback");
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },


    playCallBack : function(event){
        var node = event.target;
        var button = node.getComponent(cc.Button);
        var anim = this.overBack.getComponent(cc.Animation);
        anim.stop();
        //stop all music
        cc.audioEngine.stopAllEffects ();

        anim.play('gameplay');
        this.scheduleOnce(function(){
            this.overContainer.x = -1666;
            this.overContainer.y = 514;
            cc.director.loadScene("playscene");
            cc.game.dogover = false;
            // cc.game.restart ();
            cc.game.gameovershow = false;
        },0.2);
        
        
    },

    replayCallBack : function(event){
        var node = event.target;
        var button = node.getComponent(cc.Button);
        var anim = this.overBack.getComponent(cc.Animation);
        anim.stop();
        //stop all music
        cc.audioEngine.stopAllEffects ();

        anim.play('gameplay');
        this.scheduleOnce(function(){
            this.overContainer.x = -1666;
            this.overContainer.y = 514;
            cc.game.dogover = false;
            cc.game.gameovershow = false;
            // cc.game.restart ();
            cc.director.loadScene("splashscene");
        },0.2);
    },


    musicCallBack : function(event){
        var node = event.target;
        cc.game.music = !cc.game.music;
        if(cc.game.music){
             //back music
            cc.audioEngine.playMusic(this.back,true);
        }else{
            cc.audioEngine.stopMusic();
        }
    },

    runPlayScene : function(){
        cc.director.loadScene("playscene");
        // cc.director.runSceneImmediate("playscene");
    },

    dogyes:function(event){
        // var node = event.target;
        //播放动画 dog出现
        var exemeemptynode = cc.find("Canvas/exemeemptynode");
        var ani = exemeemptynode.getComponent(cc.Animation);
        exemeemptynode.x = 0;
        exemeemptynode.y = 0;
        exemeemptynode.zIndex = 10;
        ani.play("showdog");
    },

    wangwangwang:function(event){
        // var node = event.target;
        //播放动画 dog消失
        var exemeemptynode = cc.find("Canvas/exemeemptynode");
        var ani = exemeemptynode.getComponent(cc.Animation);

        ani.play("hidedog");


        this.scheduleOnce(function(){
            exemeemptynode.x = 2000;
            exemeemptynode.y = 2000;
            exemeemptynode.zIndex = 10;
        },0.2);

        

    },

    leaveyes:function(){
        cc.game.end();
    },

    leaveno : function(){
        // var leavecontainer = cc.find("Canvas/leavecontainer");
        // var leavecontent = cc.find("Canvas/leavecontainer/leavecontent");
        var ani = this.leavecontent.getComponent(cc.Animation);
        ani.play("leavehide");
        this.scheduleOnce(function(){
            this.leavecontainer.x = 3000;
            this.leavecontainer.y = 0;
            this.leavecontainer.zIndex = 20;
            if(!cc.game.gameovershow){
                cc.game.dogover = false;
                cc.game.music = true;
                cc.audioEngine.playMusic(this.back,true);
            }
            // cc.game.resume();
            
        },0.2);
        
    },

    /**
     * 背包按钮
     */
    packagebtn : function(){
        cc.director.loadScene("packagescene");
    },
    /**
     * 商店按钮
     */
    shopbtn : function(){
        cc.director.loadScene("shopscene");
    },
    /**
     * 返回开屏页
     */
    backToSplashScene : function(event){
        cc.director.loadScene("splashscene");
    }

});
