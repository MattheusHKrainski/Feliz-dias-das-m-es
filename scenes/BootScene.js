// scenes/BootScene.js

export default class BootScene extends Phaser.Scene {

  constructor() {
    super('BootScene');
  }

  preload() {

    // BACKGROUND
    this.load.image(
      'background',
      'assets/images/background.png'
    );

    // BAÚ
    this.load.image(
      'chest',
      'assets/images/chest.png'
    );

    // CORAÇÃO
    this.load.image(
      'heart',
      'assets/images/heart.png'
    );

    // NPC
    this.load.image(
      'npc',
      'assets/images/npc.png'
    );

    // PLAYER
    this.load.image(
      'player',
      'assets/images/player.png'
    );

    // MÚSICA
    this.load.audio(
      'music',
      'assets/audio/musica.mp3'
    );
  }

  create() {

    this.scene.start('MenuScene');
  }
}