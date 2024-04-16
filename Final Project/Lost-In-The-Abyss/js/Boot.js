class Boot extends Phaser.Scene {
    constructor() {
      super({
        key: `boot`
      });
    }

    preload() {
      // loads in the spritesheet for the avatar, shadow avatar, and candle
      // the Avatar and Shadow Avatar sprites were created by Hana Caraka on itch.io
      // https://bagong-games.itch.io/hana-caraka-base-character
      this.load.spritesheet("avatar", "assets/images/avatar.png", {
        frameWidth: 16,
        frameHeight: 16,
        endFrame: 31,
        margin: 32,
        spacing: 64
      });

      this.load.spritesheet("avatar_shadow", "assets/images/avatar_shadow.png", {
        frameWidth: 16,
        frameHeight: 16,
        endFrame: 31,
        margin: 32,
        spacing: 64
      });

      this.load.spritesheet("candle_anim", "assets/images/candle_anim.png", {
        frameWidth: 32,
        frameHeight: 32,
        endFrame: 3,
      });

      this.load.image("vision_mask", "assets/images/vision-mask.png");

      // loads in the tileset used to create the tilemap and the tilemap itself from Tiled
      this.load.image("tileset_image", "assets/tilemap/tileset.png");
      this.load.tilemapTiledJSON("tilemap", "assets/tilemap/tilemap.json");

      // recognizes that when the loading portion is completed, it transitions to the title scene
      this.load.on("complete", () => {
        this.scene.start("title");
      });

      // loads in the audio for the title scene and the play scene (the maze portion)
      this.load.audio("background_music", "assets/sounds/maze_music.mp3");
    }
  
    create() {
      // creates the loading text meant for when the program is transitioning from scene to scene
      let loadingTextStyle = {
        fontFamily: "sans-serif",
        fontSize: "40px",
        fill: "#ffffff",
        align: "center"
      };
      let loadingString = `Loading...`;
      this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);
  
      // adds the the background sound to the title and play scenes, while also looping it
      let background = this.sound.add("background_music");
      background.loop = true;
      background.play();
    }
  
    update() {
  
    }
  }