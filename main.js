import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
import EndScene from './scenes/EndScene.js';

const config = {

  type: Phaser.AUTO,

  width: window.innerWidth,

  height: window.innerHeight,

  backgroundColor: '#000000',

  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scene: [
    BootScene,
    GameScene,
    EndScene
  ]
};

new Phaser.Game(config);