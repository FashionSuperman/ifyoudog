var netTool = require("Net");
var properties = require("Properties");
cc.Class({
    extends: cc.Component,

    properties: {
        maxscoretitle : {
            default : null,
            type : cc.Label,
        },
        maxscore : {
            default : null,
            type : cc.Label,
        },
        fundstitle : {
            default : null,
            type : cc.Label,
        },
        funds : {
            default : null,
            type : cc.Label,
        },
        usernick : {
            default : null,
            type : cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

        //初始化微信工具

        var shareSuccessCallback = function(response){//判断奖励是否发放成功,给用户相应提示
            //TODO
        };


        var getWxConfigParamCallback = function(response){
            // 调用微信配置接口
            var resObj = JSON.parse(response);
            if(resObj && resObj.code == "200"){
                var resGetWxConfigParam = resObj.responseData;

                wx.ready(function(){
                    //调用配置微信接口成功
                    //绑定分享到朋友圈  分享给朋友按钮事件
                    wx.onMenuShareTimeline({
                        "title" : "如果我是一只狗最远可以走 " + (cc.game.score ? cc.game.score : 0 ) + " 米,你能吗?",
                        "desc" : "如果你是一只狗",
                        "link" : "http://www.fashionsuperman.top/ifyoudoggg/index.html",
                        "imgUrl" : "http://www.fashionsuperman.top/ifyoudoggg/sharepic.png",
                        "success" : function(){
                            //调用接口  给用户奖励
                            netTool.sendRequest(properties.url.shareSuccess,"POST",{"flag" : "1"},shareSuccessCallback);
                        },
                        "cancel" : function(){}
                    });

                    // wx.onMenuShareAppMessage({

                    // });
                });
                wx.config(resGetWxConfigParam);

            }


        };


        var getWxConfigParamData = {};
        netTool.sendRequest(properties.url.getWxConfigParam,"POST",getWxConfigParamData,getWxConfigParamCallback);


        var that = this;

        that.maxscoretitle.string = "";
        that.fundstitle.string = "";
        that.maxscore.string = "";
        that.funds.string = "";
        that.usernick.string = "";


        
        //获取用户信息
        var method = "POST";
        var data = {};
        var getUserInfoCallback = function(response){
            var resObj = JSON.parse(response);
            if(resObj && resObj.code == "200"){
                var userInfo = resObj.responseData;

                if(userInfo.nickname){
                    var nickname = userInfo.nickname;
                    var headimgurl = userInfo.headimgurl;
                    var funds = userInfo.funds;
                    var score = userInfo.score;

                    that.maxscoretitle.string = "最高分";
                    that.maxscore.string = score;

                    that.fundstitle.string = "资产";
                    that.funds.string = funds;

                    
                    //加载用户头像
                    // cc.loader.load(headimgurl, function (err, texture) {
                    //     //创建 SpriteFrame
                    //     var spriteF = cc.instantiate(cc.SpriteFrame);
                    //     spriteF.setTexture(texture);
                    //     that.userimg.spriteFrame = spriteF;
                    // });

                    that.usernick.string = nickname;
                }else{
                    that.maxscoretitle.string = "";
                    that.fundstitle.string = "";
                    that.maxscore.string = "";
                    that.funds.string = "";
                    that.usernick.string = "";
                }

                
            }else{
                that.maxscoretitle.string = "";
                that.fundstitle.string = "";
                that.maxscore.string = "";
                that.funds.string = "";
                that.usernick.string = "";
            }
        }
        netTool.sendRequest(properties.url.getLoginUserInfo,method,data,getUserInfoCallback);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
