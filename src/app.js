var GameScene = cc.Scene.extend({
    speed: 2,
    bg0: null,
    bg1: null,
    column0:null,
    column1:null,
    column2:null,
    column3:null,
    column4:null,
    column5:null,
    ground0:null,
    ground1:null,
    bowl:null,
    player: null,
    cPlayer: null,//物理模型的body
    space:null,
    minY: -166,
    maxY: 66,
    offsetX: 350,
    offsetY: 250,

    _collisionType: {
        player: 1,
        column: 2
    },
    gameOver:false,
    ctor: function () {
        this._super();

        //背景
        this.bg0 = cc.Sprite.create(res.MoveBg);
        this.bg0.setPosition(0,0);
        this.bg0.setAnchorPoint(0,0);
        this.addChild(this.bg0);
        //叠加的背景
        this.bg1 = cc.Sprite.create(res.MoveBg);
        this.bg1.setPosition(this.bg0.width,0);
        this.bg1.setAnchorPoint(0,0);
        this.addChild(this.bg1);

        //管道
        this.column0 = cc.Sprite.create(res.PipeD);
        this.column0.setPosition(640,-166);
        this.column0.setAnchorPoint(0,0);
        this.addChild(this.column0);

        this.column1 = cc.Sprite.create(res.PipeD);
        this.column1.setAnchorPoint(0, 0);
        this.column1.setPosition(640, -166 + 444 + 250);
        this.column1.setFlippedY(true);
        this.addChild(this.column1);

        this.column2 = cc.Sprite.create(res.PipeD);
        this.column2.setAnchorPoint(0, 0);
        this.column2.setPosition(990, 100);
        this.addChild(this.column2);

        this.column3 = cc.Sprite.create(res.PipeD);
        this.column3.setAnchorPoint(0, 0);
        this.column3.setPosition(990, 100+444+250);
        this.column3.setFlippedY(true);
        this.addChild(this.column3);

        this.column4 = cc.Sprite.create(res.PipeD);
        this.column4.setAnchorPoint(0, 0);
        this.column4.setPosition(1340, 166);
        this.addChild(this.column4);

        this.column5 = cc.Sprite.create(res.PipeD);
        this.column5.setAnchorPoint(0, 0);
        this.column5.setPosition(1340, 166+444+250);
        this.column5.setFlippedY(true);
        this.addChild(this.column5);

        this.ground0 = cc.Sprite.create(res.Ground);
        this.ground0.setPosition(0,0);
        this.ground0.setAnchorPoint(0,0);
        this.addChild(this.ground0);

        this.ground1 = cc.Sprite.create(res.Ground);
        this.ground1.setPosition(this.ground0.width,0);
        this.ground1.setAnchorPoint(0,0);
        this.addChild(this.ground1);

        this.bowl = cc.Sprite.create(res.Bowl);
        this.bowl.setPosition(60,0);
        this.bowl.setAnchorPoint(0,0);
        this.addChild(this.bowl);

        this.player = new player();
        this.player.setPosition(320,640);
        this.addChild(this.player);

        this.initPhysic();
        var self = this;

        var eventListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan: function (touch, event) {
                if(self.gameOver){
                    return ;
                }
                self.player.flyUp();
                self.cPlayer.vy = 0;
                self.cPlayer.applyImpulse(cc.p(0,300),cc.p(0,0));
                return true;
            }
        });

        cc.eventManager.addListener(eventListener,this);


    },
    initPhysic: function () {
        this.space = new cp.Space();
        this.space.iterations = 60;//迭代次数
        this.space.gravity = cp.v(0,-600);//重力方向
        this.space.sleepTimeThreshold = 0.5;//睡眠时间阈值
        this.space.collisionSlop = 0.5;//碰撞边界
        var body = this.cPlayer = new cp.Body(1,cp.momentForBox(1,97,84));//绑定
        body.setPos(this.player.getPosition());
        this.space.addBody(body);
        var shape = new cp.BoxShape(body,97,84);//new cp.PolyShape(body, [67, 0, 95, 21, 95, 57, 80, 68, 52, 84, 22, 84, 0, 70, 2, 49, 24, 44, 30, 18], cc.p(0, 0));
        shape.setElasticity(0);//设置弹性
        shape.setFriction(0);//设置摩擦
        shape.setCollisionType(this._collisionType.player);//设置碰撞型
        this.space.addShape(shape);//添加形状
    },
    onEnter: function () {
        this._super();
        this.scheduleUpdate();
    },
    update: function (dt) {
        if(this.gameOver){
            return;
        }
        this.bg0.x -= this.speed;
        this.bg1.x -= this.speed;
        if(this.bg0.x < -this.bg0.width){
            this.bg0.x = this.bg1.x + this.bg1.width;
        }
        if(this.bg1.x < -this.bg1.width){
            this.bg1.x = this.bg0.x + this.bg0.width;
        }
        //移动柱子
        this.column0.x -= this.speed;
        this.column1.x -= this.speed;
        this.column2.x -= this.speed;
        this.column3.x -= this.speed;
        this.column4.x -= this.speed;
        this.column5.x -= this.speed;


        //柱子偏移
        if(this.column0.x < - this.column0.width){
            this.column0.x = this.column1.x = this.column4.x +this.offsetX;
            var newY = parseInt(Math.random() * (this.maxY - this.minY + 1) + this.minY);
            this.column0.y = newY;
            this.column1.y = newY + this.column0.height + this.offsetY;
        }

        if(this.column2.x <- this.column2.width){
            this.column2.x = this.column3.x  = this.column0.x + this.offsetX;
            var newY = parseInt(Math.random() * (this.maxY - this.minY + 1) + this.minY);
            this.column2.y = newY;
            this.column3.y = newY + this.column0.height + this.offsetY;
        }
        if(this.column4.x <- this.column4.width){
            this.column4.x = this.column5.x = this.column2.x + this.offsetX;
            var newY = parseInt(Math.random() * (this.maxY - this.minY + 1) + this.minY);
            this.column4.y = newY;
            this.column5.y = newY + this.column0.height + this.offsetY;
        }
        //移动地板
        this.ground0.x -= this.speed;
        this.ground1.x -= this.speed;

        if(this.ground0.x < -this.ground0.width){
            this.ground0.x = this.ground1.x + this.ground1.width;
        }
        if(this.ground1.x < -this.ground1.width){
            this.ground1.x = this.ground0.x + this.ground0.width;
        }

        //模型Y坐标更新
        this.player.y = this.cPlayer.p.y;

        //console.log("this.player.y:",this.player.y);
        //console.log("this.ground0.y:",this.ground0.y);
        if(this.player.y <= 239){
            this.gameOver = true;
            this.player.flyDown();
        }
        //碰撞检测
        var pBox = this.player.getBoundingBoxToWorld();
        for(var i = 0; i <= 5; i++){
            var box = this["column" + i].getBoundingBoxToWorld();
            if(i % 2 == 0){
                box.y -= 10;
            }else{
                box.y += 10;
            }
            box.x += 10;
            box.width -= 10;
            box.height -= 10;

            if(cc.rectIntersectsRect(pBox, box)){
                this.gameOver = true;
                this.player.flyDown();
            }
        }

        this.space.step(dt);

    }
});


var player = cc.Sprite.extend({
    forwardAni: null,
    flyUpAni: null,
    ctor: function () {
        this._super();

        var animation = cc.Animation.create();
        animation.addSpriteFrameWithFile(res.Bird1);
        animation.addSpriteFrameWithFile(res.Bird2);
        animation.addSpriteFrameWithFile(res.Bird3);

        animation.setDelayPerUnit(0.05);
        this.forwardAni = cc.RepeatForever.create(cc.Animate.create(animation));

        var rotateUp = new cc.RotateTo(0.2, -40);
        var rotateDown = new cc.RotateTo(0.4, 40);

        this.flyUpAni = new cc.Sequence([rotateUp, rotateDown]);
    },
    onEnter:function(){
        this._super();
        this.runAction(this.forwardAni);
        var rotateDown = cc.RotateTo.create(0.2,45);
        this.runAction(rotateDown);

    },
    flyUp: function () {
        this.runAction(this.flyUpAni)
    },
    flyDown: function () {
        this.runAction(new cc.Spawn([new cc.RotateTo(0.2, 90), new cc.MoveTo((this.y - 120) / 1000, this.x, 120)]));
    }
});



