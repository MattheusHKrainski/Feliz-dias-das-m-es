export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {

    this.add.rectangle(0, 0, this.scale.width * 2, this.scale.height * 2, 0x000000)
      .setOrigin(0);

    this.add.text(
      this.scale.width / 2,
      180,
      'Feliz Dia das Mães',
      {
        fontSize: '40px',
        color: '#ffffff',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);

    this.add.text(
      this.scale.width / 2,
      260,
      'Uma pequena aventura feita com carinho ❤️',
      {
        fontSize: '20px',
        color: '#cccccc'
      }
    ).setOrigin(0.5);

    const button = this.add.text(
      this.scale.width / 2,
      420,
      'INICIAR',
      {
        fontSize: '32px',
        backgroundColor: '#ff4d6d',
        padding: {
          x: 20,
          y: 10
        },
        color: '#ffffff'
      }
    )
    .setOrigin(0.5)
    .setInteractive();

    button.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

