import Phaser from "phaser";
import "./style.css";

// creating scene
const gameScene = new Phaser.Scene("Game");

// initial scene parameters
gameScene.init = function () {
  this.playerSpeed = 3;

  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 3;

  // enemy boundary
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
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
  this.enemy = this.add.sprite(100, gameH / 2, "enemy").setScale(0.6);
  this.enemy.flipX = true;

  // set enemy speed
  const direction = Math.random() < 0.5 ? 1 : -1;
  const speed =
    this.enemyMinSpeed +
    Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
  this.enemy.speed = direction * speed;
  console.log("🚀 ~ file: main.js:50 ~ this.enemy.speed:", this.enemy.speed)

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

  // enemy movement
  this.enemy.y += this.enemy.speed;

  // check we haven't passed min or max Y
  const conditionUp = this.enemy.y <= this.enemyMinY;
  const conditionDown = this.enemy.y >= this.enemyMaxY;

  // if passed lower or higher limit, reverse the speed
  if (conditionUp || conditionDown) {
    this.enemy.speed *= -1;
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
