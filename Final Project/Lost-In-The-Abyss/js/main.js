/**
Final Project: Lost in the Abyss
Foti Aivaliklis

Lost in the Abyss is a fully developped version of my prototype submission for the game of the same name for the Game Engine Jam. 

Lost in the Abyss is a horror puzzle game where the player embarks on a journey to escape their trapped state within the Abyss Labyrinth
via comepleting a series of mazes each with unique gimmicks, including jumpscares, teleporation, collectible finding and more! In order to 
pass onto the next maze the previous one needs to be completed. With the help of the ambiance music, unique traps, and the setting, it provides
for an eerie experience for all players!

Below are the attributions listed for the received coding assistance and for all assets used that are not my own:
      CODE: Pippin Barr, Mathilde Davan, Scarlett Perez, 
            Tommy Leung ("Typewriter Effect for Text and BitmapText in Phaser 3", https://blog.ourcade.co/posts/2020/phaser-3-typewriter-text-effect-bitmap/) + 
                        ("Simple Fog of War Effect for a Phaser 3 Roguelike", https://blog.ourcade.co/posts/2020/phaser3-fog-of-war-field-of-view-roguelike/#:~:text=The%20trick%20is%20to%20create,then%20add%20a%20dark%20tint.&text=We%20create%20the%20RenderTexture%20on,to%20a%20dark%20blue%20tint)
      AVATARS: Hana Caraka on itch.io (https://bagong-games.itch.io/hana-caraka-base-character)
      JUMPSCARE: gwn_mathé (YouTube, "FNAF 1 Freddy Jumpscare", taken from the game Five Nights At Freddy's released in 2014 made by Scott Cawthon)
      WALKING SOUND EFFECT: Music & Sounds Effect Library (YouTube, "Footstep sound effects (walking sound effect)", https://www.youtube.com/watch?v=9g7uukgq0Fc)
      PAPER ASSET: ssugmi on itch.io (https://ssugmi.itch.io/16x16-rpg-assets)
      CANDLE ASSET: in collaboration with Scarlett Perez
*/

"use strict";

// the following code between lines 21-43 were written and inspired by Pippin Barr's code
// We create a JavaScript object to configure our Phaser 3 game
let config = {
    // The type refers to the kind of display we'll be using
    // which is either Canvas or WebGL. The Phaser.AUTO setting
    // will choose the best option for us.
    type: Phaser.AUTO,
    // Here we define the actual dimensions of our game's display area
    // Though note that we're able to scale the entire game as well
    // if we need to for responsive design
    width: 800,
    height: 600,
    // Because it's so common to include physics in a game, this is how
    // we set up the basic "arcade physics" engine with our game
    physics: {
      default: 'arcade',
    },
    // Finally, the scene property has an array of the different scenes
    // in our game, with the one listed first being loaded automatically
    // Right now we don't have a scene to load, so let's leave it empty
    scene: [Boot, Title, IntroText, Maze1, Maze1Text, Maze2, Jumpscare, Maze2Text, Maze3, Maze3Text, End]
  };
  
  // Here we actually create the game using this configuration!
  let game = new Phaser.Game(config);
