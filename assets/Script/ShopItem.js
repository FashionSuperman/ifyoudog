cc.Class({
    extends: cc.Component,

    properties: {
        shopitemid: 0,
        itemimg: cc.Sprite,
        commodityname: cc.Label,
        price: cc.Label,
        commoditydes: cc.Label
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    /**
     * 初始化数据
     */
    init : function(data){
        this.shopitemid = data.shopitemid;
        // this.itemimg.spriteFrame = data.itemimg;
        this.commodityname.string = data.commodityname;
        this.price.string = data.price;
        this.commoditydes.string = data.commoditydes;
    }
});
