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
        rt.fill(0x000000, 1)

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
    }

    handleInput() {
        if (this.cursors.left.isDown) {
            this.avatar.setVelocityX(-100);
            this.walkingSound.play();
        }
        else if (this.cursors.right.isDown) {
            this.avatar.setVelocityX(100);
            this.walkingSound.play();
        }
        else {
            this.avatar.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.avatar.setVelocityY(-100);
            this.walkingSound.play();
        }
        else if (this.cursors.down.isDown) {
            this.avatar.setVelocityY(100);
            this.walkingSound.play();
        }
        else {
            this.avatar.setVelocityY(0);
        }

        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            this.avatar.play(`moving`, true);
            this.walkingSound.play();
        }
        else {
            this.avatar.play(`idle`, true);
        }
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


