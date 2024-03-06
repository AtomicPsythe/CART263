class Boot extends Phaser.Scene {

    constructor() {
      super({
        key: `boot`
      });
    }

    preload() {
      this.loading.image("maze", "assets/images/maze.png");
      this.load.spritesheet("avatar", "assets/images/walk.png"), {
        frameWidth: 16,
        frameHeight: 16,
        endFrame: 7
      }

      this.load.on("complete", () => {
        this.scene.start("play");
      });
    }
  
    create() {
      let loadingTextStyle = {
        fontFamily: "sans-serif",
        fontSize: "40px",
        fill: "#ffffff",
        align: "center"
      };
      let loadingString = `Loading...`;
      this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);
  
      // Switch to the scene with the key of "play"
      this.scene.start(`play`);
    }
  
    update() {
  
    }
  }