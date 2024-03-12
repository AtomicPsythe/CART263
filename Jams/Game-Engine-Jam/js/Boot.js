class Boot extends Phaser.Scene {
    constructor() {
      super({
        key: `boot`
      });
    }

    preload() {
      // this.load.image('maze', "assets/images/maze.png");
      this.load.spritesheet("avatar", "assets/images/avatar.png", {
        frameWidth: 16,
        frameHeight: 16,
        endFrame: 31,
        margin: 32,
        spacing: 64
      });
      this.load.image("tileset_image", "assets/tilemap/tileset.png");
      this.load.tilemapTiledJSON("tilemap", "assets/tilemap/tilemap.json");

      this.load.on("complete", () => {
        this.scene.start("title");
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
  
      // Switch to the scene with the key of "title"
      // this.scene.start(`title`);
    }
  
    update() {
  
    }
  }