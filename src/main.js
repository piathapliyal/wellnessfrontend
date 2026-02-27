import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import LoginScene from "./scenes/LoginScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#1e1e2f",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [LoginScene, MainScene],
};

new Phaser.Game(config);