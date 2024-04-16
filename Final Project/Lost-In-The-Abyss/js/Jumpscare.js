class Jumpscare extends Phaser.Scene {
    constructor() {
        super({
            key: "jumpscare"
        });
    }

    // preloads the jumpscare video
    // the following jumpscare video comes from the YouTube video from gwn_mathé titled "FNAF 1 Freddy Jumpscare"
    // the clip itself is taken from the game Five Nights At Freddy's released in 2014 made by Scott Cawthon
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