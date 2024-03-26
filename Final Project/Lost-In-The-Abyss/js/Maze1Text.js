class Maze1Text extends Phaser.Scene {
    constructor() {
      super({
        key: `maze1Text`
      });
    }

    create() {
	    this.label = this.add.text(100, 100, '')
		.setWordWrapWidth(300)
        
        this.typewriteTextWrapped('Hello, World!')
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