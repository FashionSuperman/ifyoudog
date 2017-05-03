cc.Class({
    extends: cc.Component,

    properties: {
        bgv : 0,
    },

    // use this for initialization
    onLoad: function () {
      this.parent = this.node.parent;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(!cc.game.dogover){
            let pwidth = this.parent.width;
            let pheight = this.parent.height;
            if((this.node.x - this.bgv) <= -pwidth/2){
                // this.node.x = -pwidth/2;
                this.node.x = pwidth/2 + ((this.node.x - this.bgv) + pwidth/2);
            }else{
                this.node.x -= this.bgv;
            }
            // this.node.x -= this.bgv;    
            // if(this.node.x <= -pwidth/2){
            //     this.node.x = pwidth/2;
            // }
            }
        
    }
});
