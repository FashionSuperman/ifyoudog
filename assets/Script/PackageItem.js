cc.Class({
    extends: cc.Component,

    properties: {
        commodityid: 0,
        itemimg: cc.Sprite,
        commodityname: cc.Label,
        number: cc.Label,
        commoditydes: cc.Label
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    init : function(data){
        this.commodityid = data.commodityid;
        // this.itemimg.spriteFrame = data.itemimg;
        this.commodityname.string = data.commodityname;
        this.number.string = data.number;
        this.commoditydes.string = data.commoditydes;
    }
});
