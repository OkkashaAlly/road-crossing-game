import "./style.css";

import Phaser from "phaser";

// creating scene 
const gameScene = new Phaser.Scene('Game')

// setting game configuration 
const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
}

// creating the game 
const game = new Phaser.Game(config)