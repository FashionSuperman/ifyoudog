var netTool = require("Net");
var url_getShopCommodities = "http://localhost:8088/fs-game-dubbox-web/fs-game-service/Shop/getShopCommodities";
cc.Class({
    extends: cc.Component,

    properties: {
        shopItemPre:{
            default : null,
            type : cc.Prefab,
        }
    },

    // use this for initialization
    onLoad: function () {
        var that = this;
        var method = "POST";
        var data = {};
        var callback = function(response){
            var resObj = JSON.parse(response);
            if(resObj.code == "200"){
                var shopItems = resObj.responseData.rows;
                for(var i = 0 ; i < shopItems.length ; i++){
                    var item = cc.instantiate(that.shopItemPre);
                    that.node.addChild(item);
                    item.getComponent("ShopItem").init(shopItems[i]);
                }
            }
        };
        netTool.sendRequest(url_getShopCommodities,method,data,callback);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
