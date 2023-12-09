import Phaser from "phaser";
import "./style.css";

// creating scene
const gameScene = new Phaser.Scene("Game");

// loading assets
gameScene.preload = function () {
  this.load.image("background", "/assets/background.png");
  this.load.image("player", "/assets/player.png");
  this.load.image("enemy", "/assets/dragon.png");
};

// called once after preload ends
gameScene.create = function () {
  // create bg sprite
  // this.add.sprite(0, 0, "background").setOrigin(0, 0);
  const bg = this.add.sprite(0, 0, "background");

  const gameW = this.sys.game.config.width;
  const gameH = this.sys.game.config.height;

  bg.setPosition(gameW / 2, gameH / 2);

  // create player
  const player = this.add.sprite(50, 180, "player");
  // player.depth = 1 // layer position of sprite; default is 0
  // player.x = 7; // alternative to setPosition()

  // player.setScale(2, 2);
  player.setScale(2, 2);

  // create enemy
  const enemy = this.add.sprite(250, 180, "enemy");
  enemy.scaleX = 2;
  enemy.scaleY = 2;
  
  // create second enemy
  const enemy2 = this.add.sprite(450, 180, "enemy");
  enemy2.flipX = true;
  enemy2.flipY = true;
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
