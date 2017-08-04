
var properties = require("Properties");
var netTool = require("Net");
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // use this for initialization
    onLoad: function () {

    },
    buyshopitem : function(event){
       var shopItemCom = event.target.parent.getComponent("ShopItem");

       var shopItemId = shopItemCom.shopitemid;

       cc.game.shopItemId = shopItemId;

       if(1 == shopItemId){//单次购买
           //弹出购买数量窗口
           this.showbuynumwindow();
       }else if(2 == shopItemId){//终生会员
           //弹出确认购买窗口
           cc.game.buynum = 1;
           this.showbuyconfirmwindow();
       }

    },

    showbuynumwindow : function(){
        //弹出购买数量窗口
       var buynumnodeNode = cc.find("Canvas/buynumnode");

       buynumnodeNode.x = 0;
       buynumnodeNode.y = 0;
       buynumnodeNode.zIndex = 10;
    },

    showbuyconfirmwindow : function(){
        var buyconfirmnode = cc.find("Canvas/buyconfirmnode");

        buyconfirmnode.x = 0;
        buyconfirmnode.y = 0;
        buyconfirmnode.zIndex = 10;
    }

});
