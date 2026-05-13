// scenes/MenuScene.js

export default class MenuScene extends Phaser.Scene {

  constructor() {
    super('MenuScene');
  }

  create() {

    this.cameras.main.setBackgroundColor('#000000');

    this.add.text(
      this.scale.width / 2,
      180,
      'Feliz Dia das Mães ❤️',
      {
        fontSize: '48px',
        color: '#ffffff',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);

    this.add.text(
      this.scale.width / 2,
      280,
      'Uma aventura feita com carinho',
      {
        fontSize: '24px',
        color: '#cccccc'
      }
    ).setOrigin(0.5);

    const button = this.add.text(
      this.scale.width / 2,
      450,
      'INICIAR',
      {
        fontSize: '36px',
        backgroundColor: '#ff4d6d',
        color: '#ffffff',
        padding: {
          x: 30,
          y: 15
        }
      }
    )
    .setOrigin(0.5)
    .setInteractive();

    button.on('pointerdown', () => {

      this.scene.start('GameScene');
    });
  }
}