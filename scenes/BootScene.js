export default class EndScene extends Phaser.Scene {

  constructor() {
    super('EndScene');
  }

  create() {

    // FUNDO ESCURO

    this.cameras.main.fadeIn(
      2000,
      0,
      0,
      0
    );

    this.add.rectangle(
      0,
      0,
      this.scale.width * 2,
      this.scale.height * 2,
      0x000000
    )
    .setOrigin(0);

    // TÍTULO

    this.add.text(
      this.scale.width / 2,
      120,
      'Feliz Dia das Mães ❤️',
      {
        fontSize: '42px',
        color: '#ff8fab',
        fontStyle: 'bold'
      }
    )
    .setOrigin(0.5);

    // CARTA

    this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
`Mãe,

Obrigado por tudo que você fez por mim.

Cada conselho,
cada cuidado,
cada momento comigo...

Tudo isso significa muito ❤️

Esse pequeno jogo
foi feito especialmente pra você.

Te amo muito!`,
      {
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        lineSpacing: 12
      }
    )
    .setOrigin(0.5);

    // CORAÇÕES SUBINDO

    this.time.addEvent({

      delay: 500,

      loop: true,

      callback: () => {

        const heart = this.add.text(
          Phaser.Math.Between(
            100,
            this.scale.width - 100
          ),
          this.scale.height + 50,
          '❤️',
          {
            fontSize: '32px'
          }
        );

        this.tweens.add({

          targets: heart,

          y: -100,

          alpha: 0,

          duration: 4000,

          onComplete: () => {
            heart.destroy();
          }
        });
      }
    });

    // TEXTO FINAL

    this.add.text(
      this.scale.width / 2,
      this.scale.height - 80,
      'Obrigado por jogar ❤️',
      {
        fontSize: '24px',
        color: '#aaaaaa'
      }
    )
    .setOrigin(0.5);
  }
}