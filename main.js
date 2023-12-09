import Phaser from "phaser";
import "./style.css";

// creating scene
const gameScene = new Phaser.Scene("Game");

// loading assets
gameScene.preload = function () {
  this.load.image("background", "/assets/background.png");
  this.load.image("player", "/assets/player.png");
};

// called once after preload ends
gameScene.create = function () {
  // create bg sprite
  // this.add.sprite(0, 0, "background").setOrigin(0, 0);
  let bg = this.add.sprite(0, 0, "background");

  const gameW = this.sys.game.config.width;
  const gameH = this.sys.game.config.height;

  bg.setPosition(gameW / 2, gameH / 2);
};

// setting game configuration
const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
};

// creating the game
const game = new Phaser.Game(config);
