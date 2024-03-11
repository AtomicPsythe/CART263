class Boot extends Phaser.Scene {
    constructor() {
      super({
        key: `boot`
      });
    }

    preload() {
      // this.load.image('maze', "assets/images/maze.png");
      this.load.image("base_tiles", "assets/images/full tilemap.png");
      this.load.tilemapTiledJSON("maze", "assets/images/tileset.json");
      this.load.spritesheet("avatar", "assets/images/avatar.png", {
        frameWidth: 80,
        frameHeight: 80,
        endFrame: 31
      });

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
  
      // Switch to the scene with the key of "play"
      this.scene.start(`title`);
    }
  
    update() {
  
    }
  }