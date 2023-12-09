import Phaser from "phaser";
import "./style.css";

// creating scene
const gameScene = new Phaser.Scene("Game");

// initial scene parameters
gameScene.init = function () {
  this.playerSpeed = 2.5;
};

// loading assets
gameScene.preload = function () {
  this.load.image("background", "/assets/background.png");
  this.load.image("player", "/assets/player.png");
  this.load.image("enemy", "/assets/dragon.png");
  this.load.image("goal", "/assets/treasure.png");
};

// called once after preload ends
gameScene.create = function () {
  const gameH = this.sys.game.config.height;
  const gameW = this.sys.game.config.width;

  // create bg sprite
  this.add.sprite(0, 0, "background").setOrigin(0, 0);

  // create player
  this.player = this.add.sprite(40, gameH / 2, "player");

  this.player.setScale(0.5);

  // create enemy
  this.enemy = this.add.sprite(250, 180, "enemy");

  // create goal
  this.goal = this.add.sprite(gameW - 80, gameH / 2, "goal").setScale(0.6);
};

// called upto 60 times per second (frame rate)
gameScene.update = function () {
  // check user input
  if (this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  // treasure overlap check
  const playerRect = this.player.getBounds();
  const treasureRect = this.goal.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    console.log("Goal");
    this.scene.restart();
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
