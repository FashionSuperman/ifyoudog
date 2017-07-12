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
        }
    },

    // use this for initialization
    onLoad: function () {
        var that = this;

        //获取用户信息
        var method = "POST";
        var data = {};
        var getUserInfoCallback = function(response){
            var resObj = JSON.parse(response);
            if(resObj && resObj.code == "200"){
                var userInfo = resObj.responseData;

                if(userInfo){
                    var nickname = userInfo.nickname;
                    var headimgurl = userInfo.headimgurl;
                    var funds = userInfo.funds;
                    var score = userInfo.score;

                    that.maxscoretitle.string = "最高分";
                    that.maxscore.string = score;

                    that.fundstitle.string = "资产";
                    that.funds.string = funds;
                }else{
                    that.maxscoretitle.string = "";
                    that.fundstitle.string = "";
                }

                
            }else{
                that.maxscoretitle.string = "";
            }
        }
        netTool.sendRequest(properties.url.getLoginUserInfo,method,data,callback);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
