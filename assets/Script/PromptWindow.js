var properties = require("Properties");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        promptText:{
            default : null,
            type : cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    init : function(data){
        this.promptText.string = data.text;
    },

    close : function(event){

        if(cc.game.lognow){
            window.location.href = properties.url.wxlogin;
        }else{
            this.node.removeFromParent();
        }

        
    }
});
