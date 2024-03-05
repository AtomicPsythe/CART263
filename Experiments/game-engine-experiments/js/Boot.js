class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: "boot"
        });
    }

    preload() {
        this.load.image('wall', 'assets/images/wall.png');
        this.load.spritesheet('avatar', 'assets/images/avatar.png', {
            frameWidth: 32, 
            frameHeight: 32, 
            endFrame: 9 
        });

        this.load.on('complete', () => {
            this.scene.start("play");
        });
    }

    create() {
        // console.log("Play scene created!");
        let style = {
            fontFamily: "sans-serif",
            fontSize: 64, 
            color: "#ffffff"
        };
        let loadingString = "Loading..."
        this.add.text(100, 100, loadingString, style);

        this.scene.start("play");
    }

    update() {
        // console.log("Play scene updated!");
    }
}