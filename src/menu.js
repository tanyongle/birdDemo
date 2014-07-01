/**
 * Created by yongle on 14-7-1.
 */
var GameMenuLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
    },
    init: function () {
        this._super();
        var winSize = cc.director.getWinSize();
        var center_pos = cc.p(winSize.width / 2, winSize.height / 2);
        var background = cc.Sprite.create(res.Bg);
        background.setPosition(center_pos);
        this.addChild(background);

        cc.MenuItemFont.setFontSize(60);
        var startSp = cc.Sprite.create(res.Start);
        var MenuItemPlay = cc.MenuItemSprite.create(
            startSp,
            startSp.clone,
            this.onPlay(),
            this
        );
        var menu = cc.Menu.create(MenuItemPlay);
        menu.setPosition(center_pos);
        this.addChild(menu);

    },
    onPlay: function () {
        console.log("onPlay()","run...")
        // cc.director.runScene(new GameScene())
    }

});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameMenuLayer();
        layer.init();
        this.addChild(layer);
    }
});