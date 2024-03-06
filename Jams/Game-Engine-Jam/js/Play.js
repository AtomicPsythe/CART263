class Play extends Phaser.Scene {
    constructor() {
        super({
            key: "play"
        });
    }

    create() {
        console.log("Play scene created!");

        this.add.image(400, 300, 'maze');
        this.maze = this.physics.add.group({
            key: "maze",
            immovable: true,
            quantity: 1
        })

        this.avatar = this.add.sprite(100, 100, "avatar");
        this.anims.create({
            key: "avatar-moving",
            frames: this.anims.generateFrameNumbers("avatar", {
                start: 0,
                end: 31
            }),
            frameRate: 24, 
            repeat: -1
        });

        // let movingAnimationConfig = {
        //     key: "moving",
        //     frames: this.anims.generateFrameNumbers("avatar", {
        //         start: 0,
        //         end: 31
        //     }),
        //     frameRate: 24, 
        //     repeat: -1
        // }
        // this.anims.create(movingAnimationConfig);

        this.avatar.play("avatar-moving");
    }
}