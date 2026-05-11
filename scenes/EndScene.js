export default class EndScene extends Phaser.Scene {

  constructor() {
    super('EndScene');
  }

  create() {

    this.cameras.main.setBackgroundColor('#000000');

    this.cameras.main.fadeIn(3000, 0, 0, 0);

    this.add.text(
      this.scale.width / 2,
      120,
      '❤️',
      {
        fontSize: '70px'
      }
    ).setOrigin(0.5);

    this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      `Mãe,

Obrigado por tudo que você faz por mim.

Esse pequeno jogo foi feito com muito carinho para você.

Feliz Dia das Mães ❤️`,
      {
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        wordWrap: {
          width: 700
        }
      }
    ).setOrigin(0.5);
  }
}