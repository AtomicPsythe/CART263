class Maze1Text extends Phaser.Scene {
    constructor() {
      super({
        key: `maze1Text`
      });
    }

    // loads in the background image
    preload() {
        this.load.image("mazeTextImage", "assets/images/maze_text_background.png");
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // places the background image
        let background = this.add.sprite(400, 300, "mazeTextImage");
        // defines the coordinates of where the text will be placed and when the text will wrap onto the next line so it does not go off screen
	    this.label = this.add.text(100, 200, '')
		.setWordWrapWidth(600)
        
        // the text
        this.typewriteTextWrapped('Upon clearing the first maze, our protagonist finds himself very shaken. However, hope is not lost yet as he feels this is a step in the right direction towards true freedom once again! Who knows what lies left in store in the Abyss Labyrinth? Care to find out?                                        Press the space bar to continue your adventure...')

        // if the space key is pressed it will fade to the next portion of the game
        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('maze2')
        })
    }

    // creates the typewriter-like effect when the text is loading in
    typewriteText(text) {
        let length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 100
        })
    };

    // the function that creates the text wrap for the loaded text
    typewriteTextWrapped(text){
        let lines = this.label.getWrappedText(text);
        let wrappedText = lines.join("\n");

        this.typewriteText(wrappedText);
    };
}