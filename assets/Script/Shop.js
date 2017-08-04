var netTool = require("Net");
var properties = require("Properties");
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
                // cc.find("Canvas").getComponent("ShopCanvas").showSuccess("获取数据成功!");
            }
        };
        netTool.sendRequest(properties.url.url_getShopCommodities,method,data,callback);

        //TODO
        // var item1 = cc.instantiate(that.shopItemPre);
        // that.node.addChild(item1);
        // var testdata = {
        //     "shopitemid":1,
        //     "commodityname":"测试1",
        //     "price":"222",
        //     "commoditydes":"测试1"
        // }
        // item1.getComponent("ShopItem").init(testdata);

        // var item2 = cc.instantiate(that.shopItemPre);
        // that.node.addChild(item2);
        // var testdata2 = {
        //     "shopitemid":2,
        //     "commodityname":"测试2",
        //     "price":"223",
        //     "commoditydes":"测试2"
        // }
        // item2.getComponent("ShopItem").init(testdata2);
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
