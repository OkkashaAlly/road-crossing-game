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
  this.player = this.add.sprite(50, 180, "player");
  // this.player.depth = 1 // layer position of sprite; default is 0
  // this.player.x = 7; // alternative to setPosition()

  // this.player.setScale(2, 2);
  // this.player.setScale(2);

  // create enemy
  this.enemy = this.add.sprite(250, 180, "enemy");
  this.enemy.scaleX = 2;
  this.enemy.scaleY = 2;

  // create second enemy
  this.enemy2 = this.add.sprite(450, 180, "enemy");
  this.enemy2.flipX = true;
  this.enemy2.flipY = true;

  // rotation
  // this.enemy.setOrigin(0, 0);
  // this.enemy.angle = 45
  // this.enemy.setAngle(-45)
  // this.enemy.rotation = Math.PI / 4
  this.enemy.setRotation(Math.PI / 4);
};

// called upto 60 times per second (frame rate)
gameScene.update = function () {
  // this.enemy.x += 1
  // this.enemy.angle +=1

  if (this.player.scaleX < 2) {
    this.player.scaleX += 0.01;
    this.player.scaleY += 0.01;
  }
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
