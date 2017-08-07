var properties = require("Properties");
var netTool = require("Net");
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
        },
        wxpaynode:{
            default : null,
            type : cc.Node
        },

        promptWindow:{
            default : null,
            type : cc.Prefab,
        }

    },

    // use this for initialization
    onLoad: function () {
        cc.game.music = true;
         //back music
        if(this.back != null){
            cc.audioEngine.playMusic(this.back,true);
            this.overContainer = cc.find("Canvas/overcontainer");
         }
        

        
        // this.overBack = cc.find("Canvas/overcontainer/overback");
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },


    playCallBack : function(event){
        var that = this;
        //判断用户是否可玩
        var judgecanplayData = {

        };
        netTool.sendRequest(properties.url.judgecanplay,"POST",judgecanplayData,function(data){
            var resObj = JSON.parse(data);
            if(resObj.code == "200"){
                var status = resObj.responseData.status;
                if("1" == status){//可以玩
                    var node = event.target;
                    var button = node.getComponent(cc.Button);
                    var anim = that.overBack.getComponent(cc.Animation);
                    anim.stop();
                    //stop all music
                    cc.audioEngine.stopAllEffects ();

                    anim.play('gameplay');
                    that.scheduleOnce(function(){
                        that.overContainer.x = -1666;
                        that.overContainer.y = 514;
                        cc.director.loadScene("playscene");
                        cc.game.dogover = false;
                        // cc.game.restart ();
                        cc.game.gameovershow = false;
                    },0.2);
                }else if("2" == status){//没有登录,提示登录可以获得更多试玩次数
                    that.overContainer.x = -1666;
                    that.overContainer.y = 514;

                    var promptWindow = cc.instantiate(that.promptWindow);
                    promptWindow.getComponent("PromptWindow").init({"text":"觉得好玩呀,点击有上角登录继续玩吧"});
                    promptWindow.x = 0;
                    promptWindow.y = 0;
                    promptWindow.zIndex = 10;


                    that.node.addChild(promptWindow);




                }else if("3" == status){//已登录,但是次数用完,提示用户12小时后赠送,或者可以购买
                   that.overContainer.x = -1666;
                   that.overContainer.y = 514;

                    var promptWindow = cc.instantiate(that.promptWindow);
                    promptWindow.getComponent("PromptWindow").init({"text":"次数用完了,12小时之后赠送,也可以点击充值然后去商店购买哦,很便宜的呦"});
                    promptWindow.x = 0;
                    promptWindow.y = 0;
                    promptWindow.zIndex = 10;


                    that.node.addChild(promptWindow);

                }
            }
            
        });



        
        
        
    },


    temptest : function(){

        var that = this;
        var promptWindow = cc.instantiate(that.promptWindow);
        promptWindow.getComponent("PromptWindow").init({"text":"次数用完了,12小时之后赠送,也可以点击充值然后去商店购买哦"});
        promptWindow.x = 0;
        promptWindow.y = 0;
        promptWindow.zIndex = 10;


        that.node.addChild(promptWindow);
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
        var that = this;
        //判断用户是否可玩
        var judgecanplayData = {

        };
        netTool.sendRequest(properties.url.judgecanplay,"POST",judgecanplayData,function(data){
            var resObj = JSON.parse(data);
            if(resObj.code == "200"){
                var status = resObj.responseData.status;
                if("1" == status){//可以玩
                    cc.director.loadScene("playscene");
                }else if("2" == status){//没有登录,提示登录可以获得更多试玩次数
                    
                    var promptWindow = cc.instantiate(that.promptWindow);
                    promptWindow.getComponent("PromptWindow").init({"text":"觉得好玩呀,点击有上角登录继续玩吧"});
                    promptWindow.x = 0;
                    promptWindow.y = 0;
                    promptWindow.zIndex = 10;


                    that.node.addChild(promptWindow);




                }else if("3" == status){//已登录,但是次数用完,提示用户12小时后赠送,或者可以购买
                   

                    var promptWindow = cc.instantiate(that.promptWindow);
                    promptWindow.getComponent("PromptWindow").init({"text":"次数用完了,12小时之后赠送,也可以点击充值然后去商店购买哦"});
                    promptWindow.x = 0;
                    promptWindow.y = 0;
                    promptWindow.zIndex = 10;


                    that.node.addChild(promptWindow);

                }
            }
            
        });
        

        
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
    },

    /**
     * 微信登录
     */
    wxlogin : function(event){
        window.location.href = properties.url.wxlogin;
    },

    /**
     * 微信支付按钮
     */
    wxpaybutton : function(event){
        //金额弹窗
        this.wxpaynode.x = 0;
        this.wxpaynode.y = 0;
        this.wxpaynode.zIndex = 10;
    },

    /**
     * 调用微信支付接口
     */
    wxpay : function(event){
       var node = event.target;
       var buttonNmae = node.name;
       switch(buttonNmae){
            case "one":
                this.wxpayCommon(1);
                break;
            case "two":
                this.wxpayCommon(2);
                break;
            case "three":
                this.wxpayCommon(3);
                break;
            case "four":
                this.wxpayCommon(4);
                break;
            case "five":
                this.wxpayCommon(5);
                break;
            case "fourty":
                this.wxpayCommon(40);
                break;
            case "sixty":
                this.wxpayCommon(60);
                break;
            case "eighty":
                this.wxpayCommon(80);
                break;
            case "onehundred":
                this.wxpayCommon(100);
                break;
            default:
                break;         
       }
    },
    
    wxpayCommon : function(paycount){
        var that = this;
        var method = "POST";
        if(!paycount || paycount < 0){
            paycount = 1;
        }

        var OrderUrlData = {
            "note" : "充值"
        };

        netTool.sendRequest(properties.url.generateUserOrder,method,OrderUrlData,function(data) {
		
            data = JSON.parse(data);
            
            var orderid = data.responseData.orderid;
            // 调用服务获取调起微信支付的参数
            var ApplyWXPayUrlData = {
                "total_fee" : paycount,
                "orderid" : orderid
            };
            netTool.sendRequest(properties.url.applyWXPayUrl, method, ApplyWXPayUrlData, function(data) {
                data = JSON.parse(data);
                var resApplyWXPayUrl = data;
                resApplyWXPayUrl.package = resApplyWXPayUrl.backage;
                delete resApplyWXPayUrl.backage;
                that.applaywxmethod(resApplyWXPayUrl);
            });
        });
    },




    onBridgeReady : function(data){
        WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回
                                                            // ok，但并不保证它绝对可靠
                //重新请求游戏界面


            }
        });
    },

    applaywxmethod : function(data){
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady,
                        false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        } else {
            this.onBridgeReady(data);
        }
    },



    buynumyes : function(){
        //获取输入框的购买数量
        var buynum = cc.find("Canvas/buynumnode/buynumback/buynumedit").getComponent(cc.EditBox).string;
        //调用购买
        if(!/^\d+$/.test(buynum)){
            cc.find("Canvas").getComponent("ShopCanvas").showSuccess("弄啥嘞?数量哦!");
        }
        buynum = parseInt(buynum);
        this.buy(buynum);
    },

    buynumno : function(){
        var buynumnodeNode = cc.find("Canvas/buynumnode");

        buynumnodeNode.x = 1128;
        buynumnodeNode.y = 119;
        buynumnodeNode.zIndex = 10;
    },

    confirmyes : function(){
        //调用购买
        this.buy(1);
    },


    confirmno : function(){
        var buyconfirmnode = cc.find("Canvas/buyconfirmnode");

        buyconfirmnode.x = 539;
        buyconfirmnode.y = 822;
        buyconfirmnode.zIndex = 10;
    },


    buy : function(num){
        //调用购买
        // var shopitemCom = event.target.parent.getComponent("ShopItem");
        var data = {
            "shopitemid": cc.game.shopItemId,
            "number":cc.game.buynum * 10
        };
        var that = this;
        var callback = function(response){
            var resObj = JSON.parse(response);
            if(resObj.code == "200"){
                that.confirmno();
                that.buynumno();
                cc.find("Canvas").getComponent("ShopCanvas").showSuccess("购买成功!");
                
            }else{
                cc.find("Canvas").getComponent("ShopCanvas").showSuccess(resObj.message);
            }
        };
        netTool.sendRequest(properties.url.buyUrl,"POST",data,callback);
    },



    buynumselect : function(event){
       var node = event.target;
       var buttonNmae = node.name;
       switch(buttonNmae){
            case "one":
                cc.game.buynum = 1;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "two":
                cc.game.buynum = 2;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "three":
                cc.game.buynum = 3;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "four":
                cc.game.buynum = 4;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "five":
                cc.game.buynum = 5;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "six":
                cc.game.buynum = 6;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "seven":
                cc.game.buynum = 7;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "eight":
                cc.game.buynum = 8;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "nine":
                cc.game.buynum = 9;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "ten":
                cc.game.buynum = 10;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "twenty":
                cc.game.buynum = 20;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            case "thirty":
                cc.game.buynum = 30;
                this.buynumno();
                this.showbuyconfirmwindow();
                break;
            default:
                break;         
       }
    },

    showbuyconfirmwindow : function(){
        var buyconfirmnode = cc.find("Canvas/buyconfirmnode");

        buyconfirmnode.x = 0;
        buyconfirmnode.y = 0;
        buyconfirmnode.zIndex = 10;
    }


});
