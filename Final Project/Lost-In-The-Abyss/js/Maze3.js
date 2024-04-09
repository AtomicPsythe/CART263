class Maze3 extends Phaser.Scene {
    constructor() {
        super({
            key: "maze3"
        });
    }

    // loads in the walking audio for the avatar
    preload() {
        this.load.audio("walking_music", "assets/sounds/walking.mp3");
        this.load.image("paper", "assets/images/book.png");
        this.load.image("block", "assets/images/block.png");
        this.load.image("candle", "assets/images/candle.png");
    }

    create() {
        // adds in the image for the tilemap (and its layers) and the tileset
        this.add.image(0, 0, "full tilemap");
        let map = this.make.tilemap({ key: "tilemap" });
        let tileset = map.addTilesetImage("tileset", "tileset_image");
        map.createLayer("background", tileset);
        let maze = map.createLayer("maze 3", tileset);

        // loads in the avatar, adds collision to the maze's walls and adds physics to the avatar so it doesn't move through the maze
        maze.setCollisionByProperty({ collides: true });
        this.avatar = this.physics.add.sprite(753, 14, "avatar");
        this.physics.add.collider(this.avatar, maze);

        // this.add.image(399, 351, "candle");
        this.candle_anim = this.physics.add.sprite(399, 351, "candle_anim");

        // COLLECTABLES
        this.papers = this.physics.add.group({
            key: 'paper',
            quantity: 4,
            immovable: true
        });

        // an array of all of the possible positions for the papers to spawn
        const positions = [
            { // left-middle dead end
                x: 577,
                y: 300
            },
            { // bottom left
                x: 163,
                y: 482
            },
            {
                x: 193,
                y: 420
            },
            {
                x: 97,
                y: 262
            },
            {
                x: 97,
                y: 127
            },
            {
                x: 417,
                y: 162
            },
            {
                x: 544,
                y: 103
            },
            {
                x: 384,
                y: 418
            },
            {
                x: 670,
                y: 227
            },
            {
                x: 608,
                y: 100
            }
        ];
        
        // shuffles the posible postions of where the papers can spawn and picks 4
        Phaser.Utils.Array.Shuffle(positions);
        
        // creates the papers and picks the positions for them to spawn
        this.papers.children.each(function (paper) {
            const pos = positions.pop();
            paper.setPosition(16 + pos.x, 16 + pos.y);
        });

        // if the avatar overlaps with the papers they collect them and it dissapears
        this.physics.add.overlap(this.avatar, this.papers, this.destroyCollectables, null, this);

        // if all 4 papers are active on the screen then the block preventing the exit is still present
        if (this.papers.countActive() == 4) {
            this.block = this.physics.add.sprite(400, 304, "block").setImmovable(true);
            this.physics.add.collider(this.avatar, this.block);
        }

        // calls the createAnimations function so the animations get created when the avatar is in motion
        this.createAnimations();
        this.avatar.play("idle");
        this.candle_anim.play("candle_anim", true);
        // makes it so that the avatar cannot move out of bounds
        this.avatar.setCollideWorldBounds(true);
        // allows for the cursor keys to be recognized when they are pressed and released
        this.cursors = this.input.keyboard.createCursorKeys();

        // // make a RenderTexture that is the size of the screen
        // let width = this.scale.width
        // let rt = this.make.renderTexture({
        //     width: 1800,
        //     height: 1200
        // }, true)

        // // creates the "fog of war" effect fill it with black
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
        // this.vision.scale = 2.5
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

    // function for destroying the collectibles
    destroyCollectables(avatar, item){
        if (this.papers.countActive() <= 4 && this.papers.countActive() >= 1) {
            item.destroy();
        }
        // if all of the papers are collected then the block preventing the exit breaks
        if (this.papers.countActive() == 0) {
            item.destroy();
            this.block.destroy()
        }
    }

    update() {
        // calls the handleInput function
        this.handleInput();
        // allows for the light or visible area to follow the avatar's position
        if (this.vision) {
            this.vision.x = this.avatar.x
            this.vision.y = this.avatar.y
        }
        console.log(this.avatar.x);
        console.log(this.avatar.y);
    }

    handleInput() {
        // checks if each of the cardinal key buttons are pressed, if they are the avatar will move in said direction otherwise it will remain idle
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
            this.walkingSound.pause();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.scene.start("maze1Text");
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
        });

        let idleAnimationConfig = {
            key: "idle",
            frames: this.anims.generateFrameNumbers("avatar", {
                start: 0,
                end: 0
            }),
            repeat: 0
        };

        this.anims.create({
            key: "candle_anim",
            frames: this.anims.generateFrameNumbers("candle_anim", { frames: [0, 1, 2, 3] }),
            frameRate: 6,
            repeat: -1
        })

        this.anims.create(idleAnimationConfig);
    }
}