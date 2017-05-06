cc.Class({
    extends: cc.Component,

    properties: {
        success:{
            default : null,
            type : cc.Prefab,
        }
    },

    // use this for initialization
    onLoad: function () {
        
    },

    showSuccess : function(message){
        var that = this;
        //弹出提示
        var successPrompt = cc.instantiate(that.success);
        var messageNode = successPrompt.getChildByName("message");
        messageNode.getComponent(cc.Label).string = message;
        that.node.addChild(successPrompt);
        var widgetSuccess = successPrompt.getComponent(cc.Widget);
        widgetSuccess.target = that.node;
        widgetSuccess.isAlignBottom = true;
        widgetSuccess.bottom = 100;
        widgetSuccess.updateAlignment();
        var aniSuccess = successPrompt.getComponent(cc.Animation);
        aniSuccess.play("prompt");
        this.scheduleOnce(function(){
            widgetSuccess.bottom = -1000;
        },0.5);
    }
});
