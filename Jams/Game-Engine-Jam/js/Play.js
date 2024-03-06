class Play extends Phaser.Scene {
    constructor() {
        super({
            key: "play"
        });
    }

    create() {
        console.log("Play scene created!");

        this.add.image(0, 0, "maze");
        // this.add.image(100, 100, "wall");
        // this.add.image(130, 100, "wall");
        // this.add.image(160, 100, "wall");
        // this.add.image(190, 100, "wall");
        // this.add.image(190, 130, "wall");

        // this.avatar = this.add.sprite(100, 100, "avatar");
        // this.anims.create({
        //     key: "avatar-moving",
        //     frames: this.anims.generateFrameNumbers("avatar", {
        //         start: 0,
        //         end: 6
        //     }),
        //     frameRate: 24, 
        //     repeat: -1
        // });

        // this.avatar.play("avatar-moving");
    }
}