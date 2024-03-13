class Title extends Phaser.Scene {
    constructor() {
        super({
            key: "title"
        });
    }

    preload() {
        this.load.image("titleImage", "assets/images/title_background.png");
    }
    
    create() {
        let background = this.add.sprite(400, 300, "titleImage");

        let titleText = this.add.text(510, 560, "Press space to start!", {
            fontFamily: "Arial",
            fontSize: 30, 
            color: "#FFFFFF"
        });

 

        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
    
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('play')
    })}
}
