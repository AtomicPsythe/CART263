class IntroText extends Phaser.Scene {
    constructor() {
      super({
        key: `introText`
      });
    }

    preload() {
        this.load.image("introTextImage", "assets/images/intro_text_background.png");
    }

    create() {
        let background = this.add.sprite(400, 300, "introTextImage");
	    this.label = this.add.text(100, 200, '')
		.setWordWrapWidth(600)
        
        this.typewriteTextWrapped('Once upon a time, there was a man who entered a spiralling forest with his friends one day. He was dared to enter the Abyss Labyrinth and remain there for 5 minutes. As time passes on he feels something grab at his ankles and suddenly pulls him down deeper into the Abyss. He frantically races around seeking the way out... left, right, left right, up, down, but there is no escape. Now weeks later, he remains in the Abyss but finds a well lit maze that he believes may be his ticket to freedom. Will you assist him?                           Press the space bar to embark on your journey...')
        
        // let nextText = this.add.text(230, 400, "Press the space bar to embark on your journey...", {
        //     fontFamily: "American Typewriter",
        //     fontSize: 18, 
        //     color: "#FFFFFF"
        // });

        this.input.keyboard.once('keydown-SPACE', () => {
            // fade to black
            this.cameras.main.fadeOut(1000, 0, 0, 0)
        })
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('maze1')
        })
    }

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

    typewriteTextWrapped(text){
        let lines = this.label.getWrappedText(text);
        let wrappedText = lines.join("\n");

        this.typewriteText(wrappedText);
    };
}