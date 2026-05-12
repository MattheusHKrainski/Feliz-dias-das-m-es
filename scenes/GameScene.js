// scenes/GameScene.js

export default class GameScene extends Phaser.Scene {

  constructor() {
    super('GameScene');
  }

  create() {

    // BACKGROUND

    this.background = this.add.image(
      0,
      0,
      'background'
    )
    .setOrigin(0, 0);

    // MUNDO

    const worldWidth =
      this.background.displayWidth;

    const worldHeight =
      this.background.displayHeight;

    this.physics.world.setBounds(
      0,
      0,
      worldWidth,
      worldHeight
    );

    // MÚSICA

    this.music = this.sound.add(
      'music',
      {
        volume: 0.4,
        loop: true
      }
    );

    this.music.play();

    // PLAYER

    this.player = this.physics.add
      .image(
        400,
        300,
        'player'
      )
      .setScale(0.2);

    this.player.setCollideWorldBounds(true);

    // BAÚ

    this.chest = this.physics.add
      .staticImage(
        1400,
        900,
        'chest'
      )
      .setScale(0.15);

    // PARTÍCULAS

    this.add.particles(
      0,
      0,
      'heart',
      {
        x: this.chest.x,
        y: this.chest.y,

        speed: 20,

        scale: {
          start: 0.1,
          end: 0
        },

        lifespan: 2000,

        frequency: 500
      }
    );

    // NPC

    this.npc = this.physics.add
      .staticImage(
        900,
        500,
        'npc'
      )
      .setScale(2);

    // PAREDES

    this.walls =
      this.physics.add.staticGroup();

    this.walls.create(
      900,
      1200,
      'chest'
    )
    .setDisplaySize(1800, 300)
    .refreshBody();

    this.walls.create(
      100,
      300,
      'chest'
    )
    .setDisplaySize(200, 700)
    .refreshBody();

    this.walls.create(
      1800,
      300,
      'chest'
    )
    .setDisplaySize(200, 700)
    .refreshBody();

    this.physics.add.collider(
      this.player,
      this.walls
    );

    // CÂMERA

    this.cameras.main.setBounds(
      0,
      0,
      worldWidth,
      worldHeight
    );

    this.cameras.main.startFollow(
      this.player,
      true,
      0.08,
      0.08
    );

    this.cameras.main.setZoom(1.5);

    // CONTROLES

    this.cursors =
      this.input.keyboard.createCursorKeys();

    this.keyE =
      this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.E
      );

    // TEXTO

    this.message = this.add.text(
      20,
      20,
      'Encontre o baú especial ❤️',
      {
        fontSize: '24px',
        fill: '#ffffff',
        backgroundColor: '#000000',
        padding: {
          x: 10,
          y: 10
        }
      }
    );

    this.message.setScrollFactor(0);
  }

  update() {

    const speed = 180;

    this.player.setVelocity(0);

    // ESQUERDA

    if (this.cursors.left.isDown) {

      this.player.setVelocityX(
        -speed
      );
    }

    // DIREITA

    else if (
      this.cursors.right.isDown
    ) {

      this.player.setVelocityX(
        speed
      );
    }

    // CIMA

    else if (
      this.cursors.up.isDown
    ) {

      this.player.setVelocityY(
        -speed
      );
    }

    // BAIXO

    else if (
      this.cursors.down.isDown
    ) {

      this.player.setVelocityY(
        speed
      );
    }

    // DISTÂNCIA NPC

    const npcDistance =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.npc.x,
        this.npc.y
      );

    if (npcDistance < 100) {

      this.message.setText(
        'Criança: O baú especial está escondido ❤️'
      );
    }

    // DISTÂNCIA BAÚ

    const chestDistance =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.chest.x,
        this.chest.y
      );

    if (chestDistance < 80) {

      this.message.setText(
        'Pressione E para abrir ❤️'
      );

      if (
        Phaser.Input.Keyboard.JustDown(
          this.keyE
        )
      ) {

        if (this.music) {
          this.music.stop();
        }

        this.scene.start(
          'EndScene'
        );
      }
    }

    else if (npcDistance >= 100) {

      this.message.setText(
        'Encontre o baú especial ❤️'
      );
    }
  }
}