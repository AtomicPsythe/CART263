class Maze2 extends Phaser.Scene {
    constructor() {
        super({
            key: "maze2"
        });
    }

    // loads in the walking audio for the avatar and the jumpscare for if the avatar and shadow avatar overlap
    preload() {
        this.load.audio("walking_music", "assets/sounds/walking.mp3");
        this.load.video("jumpscare", "assets/videos/jumpscare_temp.mp4");
    }

    create() {
        // fades in the new maze after maze1Text
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // adds in the image for the tilemap (and its layers) and the tileset
        // the insertion of the tilemap into the game was done with the help of Pippin Barr
        let map = this.make.tilemap({ key: "tilemap" });
        let tileset = map.addTilesetImage("tileset", "tileset_image");
        map.createLayer("background", tileset);
        let maze = map.createLayer("maze 2", tileset);

        // creates the collisions for the maze's blocks and loads in the avatar
        maze.setCollisionByProperty({ collides: true });
        this.avatar = this.physics.add.sprite(30, 310, "avatar");

        // collects the avatar's previous positions and movements in an array
        // lines 30-31 were done in collaboration with Pippin Barr
        this.avatar.history = [];
        console.log("Play scene created!");

        // adds collisions between the avatar and the maze
        this.physics.add.collider(this.avatar, maze);

        // calls the createAnimations function so the animations get created when the avatar is in motion
        this.createAnimations();

        // creates the shadow avatar and has it spawn 2 seconds after the avatar loads in and begins to move
        // the following code from lines 39-47 was done in collaboration with Pippin Barr
        this.avatarShadow = this.physics.add.sprite(30, 310, "avatar_shadow");
        this.avatarShadow.play("shadow_moving");
        this.avatarShadow.setVisible(false);
        this.physics.add.overlap(this.avatarShadow, this.avatar, null, this.caught, this);

        this.time.delayedCall(2000, () => {
            console.log("HERE COMES THE SHADOW!!!");
            this.avatarShadow.setVisible(true);
        });

        this.avatar.play("idle");
        // makes it so that the avatar cannot move out of bounds
        this.avatar.setCollideWorldBounds(true);
        // allows for the cursor keys to be recognized when they are pressed and released
        this.cursors = this.input.keyboard.createCursorKeys();

        // the following code between lines 60-80 were inspired by the following article titled "Simple Fog of War Effect for a Phaser 3 Roguelike" written by Tommy Leung
        // https://blog.ourcade.co/posts/2020/phaser3-fog-of-war-field-of-view-roguelike/#:~:text=The%20trick%20is%20to%20create,then%20add%20a%20dark%20tint.&text=We%20create%20the%20RenderTexture%20on,to%20a%20dark%20blue%20tint.
        // make a RenderTexture that is the size of the screen
        let width = this.scale.width
        let rt = this.make.renderTexture({
            width: 1800,
            height: 1200
        }, true)

        // creates the "fog of war" effect and fills it with black
        rt.fill(0x000000, 1)
        // set a dark blue tint
        rt.setTint(0x0a2948)

        // allows for a light or visible area to only be displayed where the avatar is, everywhere else is dark
        this.vision = this.make.image({
            x: this.avatar.x,
            y: this.avatar.y,
            key: 'vision',
            add: false
        })
        this.vision.scale = 5
        rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision)
        rt.mask.invertAlpha = true

        // creates the walking noise and plays it on a loop
        this.walkingSound = this.sound.add("walking_music", {
            volume: 0.75
        });
        this.walkingSound.loop = true;
        this.walkingSound.play();
        this.walkingSound.pause();
    }

    // checks if the avatar and shadow avatar overlap, if they do then the maze reloads and the player must restart the maze
    // the following code from lines 91-99 was done in collaboration with Pippin Barr
    caught(shadow, avatar) {
        if (this.avatarShadow.visible) {
            console.log("Overlap");
            this.walkingSound.stop();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            // calls the jumpscare class so that it can play the jumpscare and restart the maze
            this.scene.start("jumpscare");
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

        // allows for the shadow avatar to follow the same previous movements as the avatar, making it chase it until the avatar gets caught or exits the maze (shadow mario from super mario galaxy style)
        // the following code from lines 112-119 was done in collaboration with Pippin Barr
        this.avatar.history.push({
            x: this.avatar.x,
            y: this.avatar.y
        });
        if (this.avatarShadow.visible) {
            const pos = this.avatar.history.shift();
            this.avatarShadow.setPosition(pos.x, pos.y);
        }
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

        // checks if the avatar has reached the end of the maze if they have they will load into the next portion of the game
        if (this.avatar.x >= 784 && this.avatar.y >= 300) {
            this.scene.start("maze2Text");
            this.walkingSound.pause();
            this.cameras.main.fadeOut(1000, 0, 0, 0);
        }
    }

    // creates the walking and idle animations for the avatar and the shadow avatar
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
            key: "shadow_moving",
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