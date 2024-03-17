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
        let background = this.add.sprite(400, 300, "endImage");

        let endingText = this.add.text(510, 560, "Refresh to play again!", {
            fontFamily: "Arial",
            fontSize: 30, 
            color: "#FFFFFF"
        });
    }
}