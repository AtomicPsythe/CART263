class Jumpscare extends Phaser.Scene {
    constructor() {
        super({
            key: "jumpscare"
        });
    }

    preload() {
        this.load.video("jumpscare", "assets/videos/jumpscare_temp.mp4");
    }

    // calls for the jumpscare to play if the avatar and shadow avatar overlap, then restarts the maze class once its completed
    create() {
        this.video = this.add.video(400, 300, 'jumpscare');
        this.video.setScale(2.3);
        this.video.play();
        console.log(this.video);
        this.video.on("complete", () => {
            this.scene.start("maze2");
        });
    }
}