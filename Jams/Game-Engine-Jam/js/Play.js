class Play extends Phaser.Scene {
    constructor() {
        super({
            key: "play"
        });
    }

    create() {
        this.add.image(0, 0, "full tilemap");
        let map = this.make.tilemap({ key: "tileset_map"});
        let tileset = map.addTilesetImage("full tilemap", "tileset_map");
        map.createLayer("background", tileset);
        map.createLayer("maze", tileset);
        // this.cameras.main.fadeIn(1000, 0, 0, 0);
        console.log("Play scene created!");
        this.maze = this.physics.add.sprite(400, 300, "maze");

        this.avatar = this.physics.add.sprite(50, 590, "avatar");
        console.log(this.avatar);

        this.createAnimations();
        this.avatar.play("idle");
        this.avatar.setCollideWorldBounds(true);

        // this.physics.add.collider(this.avatar, this.maze);

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