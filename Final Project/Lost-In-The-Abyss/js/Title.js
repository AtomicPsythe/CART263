class Title extends Phaser.Scene {
    constructor() {
        super({
            key: "title"
        });
    }

    // loads the title screen image
    preload() {
        this.load.image("titleImage", "assets/images/title_background.png");
    }
    
    create() {
        // creates the image so it can be loaded
        let background = this.add.sprite(400, 300, "titleImage");

        // the text present on the title screen
        let titleText = this.add.text(510, 560, "Press space to start!", {
            fontFamily: "Arial",
            fontSize: 30, 
            color: "#FFFFFF"
        });

        // when the space bar is pressed, it will start a fade that will lead into the play scene
        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
    
        // once the fade is completed, it will transition to the play scene
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('maze1Text')
    })}
}
