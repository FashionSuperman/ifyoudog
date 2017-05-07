var netTool = require("Net");
var properties = require("Properties");
cc.Class({
    extends: cc.Component,

    properties: {
        packageItemPre : {
            type:cc.Prefab,
            default:null
        }
    },

    // use this for initialization
    onLoad: function () {
        var that = this;
        var method = "POST";
        var data = {
            "userid":1
        };
        var callback = function(response){
            var resObj = JSON.parse(response);
            if(resObj.code == "200"){
                var packageItems = resObj.responseData.rows;
                for(var i = 0 ; i < packageItems.length ; i++){
                    var item = cc.instantiate(that.packageItemPre);
                    that.node.addChild(item);
                    item.getComponent("PackageItem").init(packageItems[i]);
                }
                // cc.find("Canvas").getComponent("ShopCanvas").showSuccess("获取数据成功!");
            }
        };
        netTool.sendRequest(properties.url.url_getUserPackageList,method,data,callback);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
