class Play extends Phaser.Scene {
    constructor() {
        super({
            key: "play"
        });
    }

    create() {
        // this.cameras.main.fadeIn(1000, 0, 0, 0);
        console.log("Play scene created!");
        this.maze = this.physics.add.sprite(400, 300, "maze");
        // let rt = this.make.renderTexture({
        //     width: 600,
        //     height: 1000
        // }, true);
        // rt.fill(0x000000, 1);
        // rt.draw("maze");
        // rt.setTint(0x0a2948);

        // let vision = this.make.image({
        //     x: this.avatar.x,
        //     y: this.avatar.y,
        //     key: 'vision',
        //     add: false
        // });

        // vision.scale = 2.5
        // rt.mask = new Phaser.Display.Masks.BitmapMask(this, vision)
	    // rt.mask.invertAlpha = true

        // if (this.vision) {
		//     this.vision.x = this.player.x
		//     this.vision.y = this.player.y
	    // };

        this.avatar = this.physics.add.sprite(50, 590, "avatar");
        console.log(this.avatar);

        this.physics.add.collider(this.avatar, this.maze);
        
        this.createAnimations();

        this.avatar.play("idle");

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.handleInput();
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
            this.avatar.play(`moving`, true);
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