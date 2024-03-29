class Maze2 extends Phaser.Scene {
    constructor() {
        super({
            key: "maze2"
        });
    }

    // loads in the walking audio for the avatar
    preload() {
        this.load.audio("walking_music", "assets/sounds/walking.mp3");
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        console.log("playing maze 2");
        // adds in the image for the tilemap (and its layers) and the tileset
        let map = this.make.tilemap({ key: "tilemap" });
        let tileset = map.addTilesetImage("tileset", "tileset_image");
        map.createLayer("background", tileset);
        let maze = map.createLayer("maze 2", tileset);

        // loads in the avatar, adds collision to the maze's walls and adds physics to the avatar so it doesn't move through the maze
        maze.setCollisionByProperty({ collides: true });
        this.add.image(80, 300, "block");
        this.avatar = this.physics.add.sprite(30, 310, "avatar");
        // this.avatarShadow = this.physics.add.sprite(60, 300, "avatar_shadow");
        this.physics.add.collider(this.avatar, this.block, this.function, null, this);
        if (this.avatar.x >= 80 && this.avatar.x <= 90 && this.avatar.y >= 300 && this.avatar.y <= 310) {
            this.avatarShadow = this.physics.add.sprite(60, 300, "avatar_shadow");
        }
        this.physics.add.collider(this.avatar, maze);
        this.physics.add.collider(this.avatarShadow, maze);
        console.log("Play scene created!");

        // calls the createAnimations function so the animations get created when the avatar is in motion
        this.createAnimations();
        this.avatar.play("idle");
        // makes it so that the avatar cannot move out of bounds
        this.avatar.setCollideWorldBounds(true);
        // allows for the cursor keys to be recognized when they are pressed and released
        this.cursors = this.input.keyboard.createCursorKeys();

        // make a RenderTexture that is the size of the screen
        let width = this.scale.width
        let rt = this.make.renderTexture({
            width: 1800,
            height: 1200
        }, true)

        // // creates the "fog of war" effect
        // // fill it with black
        // rt.fill(0x000000, 1)
        // // set a dark blue tint
        // rt.setTint(0x0a2948)

        // // allows for a light or visible area to only be displayed where the avatar is, everywhere else is dark
        // this.vision = this.make.image({
        //     x: this.avatar.x,
        //     y: this.avatar.y,
        //     key: 'vision',
        //     add: false
        // })
        // this.vision.scale = 4
        // rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision)
        // rt.mask.invertAlpha = true

        // creates the walking noise and plays it on a loop
        this.walkingSound = this.sound.add("walking_music", {
            volume: 0.75
        });
        this.walkingSound.loop = true;
        this.walkingSound.play();
        this.walkingSound.pause();
    }

    update() {
        // calls the handleInput function
        this.handleInput();
        // allows for the light or visible area to follow the avatar's position
        if (this.vision) {
            this.vision.x = this.avatar.x
            this.vision.y = this.avatar.y
        }
        this.physics.moveToObject(this.avatarShadow, this.avatar, 100);
        // if (this.avatar.x >= 80 && this.avatar.x <= 90 && this.avatar.y >= 300 && this.avatar.y <= 310) {
        //     this.avatarShadow = this.physics.add.sprite(60, 300, "avatar_shadow");
        // }
        // this.avatarShadow.x = this.avatar.x - 30;
        // if (this.avatar.x >= 80 && this.avatar.x <= 90 && this.avatar.y >= 300 && this.avatar.y <= 310) {
        //     this.physics.moveToObject(this.avatarShadow, this.avatar, 100);
        // }
        console.log(this.avatar.x);
        console.log(this.avatar.y);
    }

    handleInput() {
        // checks if each of the cardinal key buttons are pressed, if they are the avatar will move in said direction
        // otherwise it will remain idle
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

        // whenever the avatar is in motion, it will move and the walking sound will play in conjunction
        if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
            this.walkingSound.resume();
            this.avatar.play(`moving`, true);
        }
        else {
            this.walkingSound.pause();
            this.avatar.play(`idle`, true);
        }

        if (this.avatar.x >= 784 && this.avatar.y >= 558) {
            this.scene.start("end");
            this.walkingSound.pause();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        }
    }

    // creates the walking and idle animations for the avatar
    createAnimations() {
        this.anims.create({
            key: "moving",
            frames: this.anims.generateFrameNumbers("avatar", {
                start: 0,
                end: 31
            }),
            frameRate: 12,
            repeat: -1
        })
        this.anims.create({
            key: "moving",
            frames: this.anims.generateFrameNumbers("avatar_shadow", {
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
        }
        this.anims.create(idleAnimationConfig);
    }
}