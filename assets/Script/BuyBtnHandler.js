var buyUrl = "http://localhost:8088/fs-game-dubbox-web/fs-game-service/Shop/buyShopCommodity";
var netTool = require("Net");
var properties = require("Properties");
cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad: function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "BuyBtnHandler";//这个是代码文件名
        clickEventHandler.handler = "callback";
        // clickEventHandler.customEventData = "foobar";

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);
    },

    callback: function (event) {
        //这里 event 是一个 Touch Event 对象，你可以通过 event.target 取到事件的发送节点
        var shopitemCom = event.target.parent.getComponent("ShopItem");
        var data = {
            "userid":1,
            "shopitemid":shopitemCom.shopitemid,
            "number":1
        };
        var callback = function(response){
            var resObj = JSON.parse(response);
            if(resObj.code == "200"){
                cc.find("Canvas").getComponent("ShopCanvas").showSuccess("购买成功!");
            }else{
                cc.find("Canvas").getComponent("ShopCanvas").showSuccess(resObj.message);
            }
        };
        netTool.sendRequest(properties.url.buyUrl,"POST",data,callback);
    }
});