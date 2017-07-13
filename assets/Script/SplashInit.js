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
