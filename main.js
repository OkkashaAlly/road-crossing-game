import Phaser from "phaser";
import "./style.css";

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: 0x5f6e7a,
};

const game= new Phaser.Game(config)
console.log("🚀 ~ file: main.js:12 ~ game:", game)
