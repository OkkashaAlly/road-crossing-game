import Phaser from "phaser";
import "./style.css";

// creating scene
const gameScene = new Phaser.Scene("Game");

// ======================================================================
// initial scene parameters
gameScene.init = function () {
  this.playerSpeed = 3;

  this.enemyMinSpeed = 1;
  this.enemyMaxSpeed = 2.5;

  // enemy boundary
  this.enemyMaxY = 280;
  this.enemyMinY = 80;
};

// ====================================================================
// loading assets
gameScene.preload = function () {
  this.load.image("background", "/assets/background.png");
  this.load.image("player", "/assets/player.png");
  this.load.image("enemy", "/assets/dragon.png");
  this.load.image("goal", "/assets/treasure.png");
};

// =====================================================================
// called once after preload ends
gameScene.create = function () {
  const gameH = this.sys.game.config.height;
  const gameW = this.sys.game.config.width;

  // create bg sprite
  this.add.sprite(0, 0, "background").setOrigin(0, 0);

  // create player
  this.player = this.add.sprite(40, gameH / 2, "player");

  this.player.setScale(0.5);

  // create enemies(group)
  this.enemies = this.add.group({
    key: "enemy",
    repeat: 5,
    setXY: {
      x: 90,
      y: 100,
      stepX: 80,
      stepY: 20,
    },
  });
  // adding sprite to a group
  // this.enemies.add(this.enemy);
  // console.log(this.enemies.getChildren());

  const enemies = this.enemies.getChildren();

  // scaling all enemies
  Phaser.Actions.SetScale(enemies, 0.6);

  // flipX and set speed
  Phaser.Actions.Call(
    enemies,
    function (enemy) {
      enemy.flipX = true;

      // set enemy speed
      const direction = Math.random() < 0.5 ? 1 : -1;
      const speed =
        this.enemyMinSpeed +
        Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
      enemy.speed = direction * speed;
    },
    this
  );

  // create goal
  this.goal = this.add.sprite(gameW - 80, gameH / 2, "goal").setScale(0.6);
};

// ====================================================================
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

  // get enemies
  const enemies = this.enemies.getChildren();

  // loop over the enemies
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];

    // enemy movement
    enemy.y += enemy.speed;

    // check we haven't passed min or max Y
    const conditionUp = enemy.y <= this.enemyMinY;
    const conditionDown = enemy.y >= this.enemyMaxY;

    // if passed lower or higher limit, reverse the speed
    if (conditionUp || conditionDown) {
      enemy.speed *= -1;
    }

    // check enemy overlap check
    const enemyRect = enemy.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
      console.log("Game over");
      this.scene.restart();
    }
  }
};

// ==================================================================
// setting game configuration
const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
};

// creating the game
const game = new Phaser.Game(config);
