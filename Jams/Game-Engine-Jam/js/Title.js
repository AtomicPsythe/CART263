class Title extends Phaser.Scene {
    constructor() {
        super({
            key: "Title"
        });
    }

    preload() {
        this.load.image("titleImage", "assets/images/title_background.png");
    }
    
    create() {
        let background = this.add.sprite(400, 300, "titleImage");

        let titleText = this.add.text(250, 500, "Press space to start!", {
            fontFamily: "Arial",
            fontSize: 30, 
            color: "#000000"
        });

 

        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
    
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('play')
    })}
}
