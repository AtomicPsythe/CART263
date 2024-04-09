class Title extends Phaser.Scene {
    constructor() {
        super({
            key: "title"
        });
    }

    // loads the title screen image
    preload() {
        this.load.image("titleImage", "assets/images/new_title_background.png");
        this.load.image("startButton", "assets/images/start_title.png");
        this.load.image("controlsButton", "assets/images/controls_title.png");
        this.load.image("controlsX", "assets/images/options_x.png");
        this.load.image("controlsInstructions", "assets/images/options_title_image.png");
        this.load.image("creditsButton", "assets/images/credits_title.png");
    }
    
    create() {
        // creates the image so it can be loaded
        let background = this.add.sprite(400, 300, "titleImage");
        
        // create the start button, where upon clicking it starts the game
        let startButton = this.add.image(this.game.renderer.width / 1.2, this.game.renderer.height / 2.1 + 50, "startButton");
        startButton.setInteractive()
        startButton.on("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.scene.start("maze2");
        })

        // creates the controls button, upon being clicked opens the controls image where it displays the controls and if the X is clicked on the image closes the instructions image
        let controlsButton = this.add.image(this.game.renderer.width / 1.19, this.game.renderer.height / 1.6 + 50, "controlsButton")
        controlsButton.setInteractive();
        controlsButton.on("pointerdown", () => {
            let instructionPage = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "controlsInstructions");
            let controlsX = this.add.image(140, 100, "controlsX");
            controlsX.setInteractive();
            controlsX.on("pointerdown", () => {
                instructionPage.visible = false;
                controlsX.visible = false;
            });
        });

        // do the same for credits
        let creditsButton = this.add.image(this.game.renderer.width / 1.2, this.game.renderer.height / 1.3 + 50, "creditsButton");
    }
}
