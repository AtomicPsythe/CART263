class Play extends Phaser.Scene {
    constructor() {
        super({
            key: "play"
        });
    }

    preload() {
        this.load.audio("walking_music", "/assets/sounds/walking.mp3");
    }

    create() {
        this.add.image(0, 0, "full tilemap");
        let map = this.make.tilemap({ key: "tilemap"});
        let tileset = map.addTilesetImage("tileset", "tileset_image");
        map.createLayer("background", tileset);

        let maze = map.createLayer("maze", tileset);
        maze.setCollisionByProperty({ collides: true});
        this.avatar = this.physics.add.sprite(50, 590, "avatar");
        this.physics.add.collider(this.avatar, maze);
        console.log("Play scene created!");

        this.createAnimations();
        this.avatar.play("idle");
        this.avatar.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        let width = this.scale.width
	    
        // make a RenderTexture that is the size of the screen
        let rt = this.make.renderTexture({
            width: 1800,
            height: 1200
        }, true)

        // fill it with black
        // rt.fill(0x000000, 1)

        // set a dark blue tint
        rt.setTint(0x0a2948)

        this.vision = this.make.image({
            x: this.avatar.x,
            y: this.avatar.y,
            key: 'vision',
            add: false
        })
        this.vision.scale = 2.5

        rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision)
        rt.mask.invertAlpha = true

        this.walkingSound = this.sound.add("walking_music", {
            volume: 0.75
        });
    }

    update() {
        this.handleInput();
        if (this.vision)
        {
            this.vision.x = this.avatar.x
            this.vision.y = this.avatar.y
        }
        console.log(this.avatar.x);
        console.log(this.avatar.y);
    }

    handleInput() {
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-100);
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(100);
        }
        else {
            this.avatar.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-100);
        }
        else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(100);
        }
        else {
            this.avatar.setVelocityY(0);
        }

        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            this.walkingSound.play();
            this.avatar.play(`moving`, true);
        }
        else {
            this.walkingSound.play();
            this.avatar.play(`idle`, true);
        }

        if (this.avatar.x >= 784 && this.avatar.y >= 558) {
            this.scene.start("end");
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        }

        if (this.avatar.x > 131 && this.avatar.y >= 334) {
            this.avatar.x = 50;
            this.avatar.y = 590;
        }

        // if (this.avatar.x >= 47 && this.avatar.y >= 233) {
        //     this.avatar.x = 50;
        //     this.avatar.y = 590;
        // }
    }

    createAnimations() {
        this.anims.create({
            key: "moving",
            frames: this.anims.generateFrameNumbers("avatar", {
                start: 0,
                end: 31
            }),
            frameRate: 12, 
            repeat: -1
        });

        let idleAnimationConfig = {
            key: "idle",
            frames: this.anims.generateFrameNumbers("avatar", {
                start: 0,
                end: 0
            }),
            repeat: 0
        };
        this.anims.create(idleAnimationConfig);
    }
}


