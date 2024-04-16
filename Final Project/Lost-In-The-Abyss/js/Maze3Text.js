class Maze3Text extends Phaser.Scene {
    constructor() {
      super({
        key: `maze3Text`
      });
    }

    // loads in the background image
    preload() {
        this.load.image("mazeTextImage", "assets/images/maze_text_background.png");
    }

    create() {
        // creates a fade in for a smooth transition
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // places the background image
        let background = this.add.sprite(400, 300, "mazeTextImage");
        // defines the coordinates of where the text will be placed and when the text will wrap onto the next line so it does not go off screen
        // the following code from lines 21-57 were created by following the Phaser tutorial titled "Typewriter Effect for Text and BitmapText in Phaser 3" written by Tommy Leung
        // https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/
	    this.label = this.add.text(100, 200, '')
		.setWordWrapWidth(600)
        
        // the text
        this.typewriteTextWrapped('Upon picking up the Last Light candle a secret door has opened leading to the beautiful outside world we have missed so much! You have done it dear traveler, you have escaped the Abyss Labyrinth in one piece... or so we think so! Embrace the breeze, the greenery and true freedom at last!                  Press the space bar to put a close on your journey...')

        // if the space key is pressed it will fade to the next portion of the game
        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('end')
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