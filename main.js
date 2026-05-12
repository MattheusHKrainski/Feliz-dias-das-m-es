import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import EndScene from './scenes/EndScene.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  pixelArt: true,

  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [
    BootScene,
    MenuScene,
    GameScene,
    EndScene
  ]
};

new Phaser.Game(config);
