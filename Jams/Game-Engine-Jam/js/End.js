class End extends Phaser.Scene {
    constructor() {
        super({
            key: "end"
        });
    }

    preload() {
        this.load.image("endImage", "assets/images/ending_background.png");
    }
    
    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let background = this.add.sprite(400, 300, "endImage");

        let endingText = this.add.text(500, 560, "Refresh to play again!", {
            fontFamily: "Arial",
            fontSize: 30, 
            color: "#FFFFFF"
        });
    }
}