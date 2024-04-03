class IntroText extends Phaser.Scene {
    constructor() {
      super({
        key: `introText`
      });
    }

    // loads in the background 
    preload() {
        this.load.image("introTextImage", "assets/images/intro_text_background.png");
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // places the background image
        let background = this.add.sprite(400, 300, "introTextImage");
        // defines the coordinates of where the text will be placed and when the text will wrap onto the next line so it does not go off screen
	    this.label = this.add.text(100, 200, '')
		.setWordWrapWidth(600)
        
        // the text
        this.typewriteTextWrapped('Once upon a time, there was a man who entered a spiralling forest with his friends one day. He was dared to enter the Abyss Labyrinth and remain there for 5 minutes. As time passes on he feels something grab at his ankles and suddenly pulls him down deeper into the Abyss. He frantically races around seeking the way out... left, right, left right, up, down, but there is no escape. Now weeks later, he remains in the Abyss but finds a well lit maze that he believes may be his ticket to freedom. Will you assist him?                           Press the space bar to embark on your journey...')
    
        // if the space key is pressed it will fade to the next portion of the game
        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('maze1')
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