class End extends Phaser.Scene {
    constructor() {
        super({
            key: "end"
        });
    }

    // loads in the ending screen background image
    preload() {
        this.load.image("endImage", "assets/images/ending_background.png");
    }
    
    create() {
        // adds a fade in from the end of the play scene to the beginning of the end scene
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // displays the background image
        let background = this.add.sprite(400, 300, "endImage");
        // displays the end scene text
        let endingText = this.add.text(500, 560, "Refresh to play again!", {
            fontFamily: "Arial",
            fontSize: 30, 
            color: "#FFFFFF"
        });
    }
}