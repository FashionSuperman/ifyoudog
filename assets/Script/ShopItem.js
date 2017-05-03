cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        itemimg: cc.Sprite,
        itemname: cc.Label,
        itemprice: cc.Label,
        itemdes: cc.Label
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
        this.id = data.id;
        // this.itemimg.spriteFrame = data.itemimg;
        this.itemname.string = data.itemname;
        this.itemprice.string = data.itemprice;
        this.itemdes.string = data.itemdes;
    }
});
