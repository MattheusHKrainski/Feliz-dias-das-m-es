export default class GameScene extends Phaser.Scene {

  constructor() {
    super('GameScene');
  }

  create() {

    // =========================
    // BACKGROUND
    // =========================

    this.background = this.add.image(
      0,
      0,
      'background'
    )
    .setOrigin(0, 0)
    .setScale(1);

    // =========================
    // TAMANHO DO MUNDO
    // =========================

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

    // =========================
    // MÚSICA
    // =========================

    this.music = this.sound.add('music', {
      volume: 0.4,
      loop: true
    });

    this.music.play();

    // this.music = this.sound.add('music', {
//   volume: 0.4,
//   loop: true
// });

// this.music.play();

    // =========================
    // PLAYER
    // =========================

    this.player = this.physics.add
      .sprite(400, 300, 'player')
      .setScale(0.2);

    this.player.setCollideWorldBounds(true);

    // =========================
    // BAÚ
    // =========================

    this.chest = this.physics.add
      .staticImage(1400, 900, 'chest')
      .setScale(0.15);

      // PARTÍCULAS DO BAÚ

tthis.add.particles(
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
  .staticImage(900, 500, 'npc')
  .setScale(2);

    // =========================
    // COLISÕES
    // =========================

    this.walls = this.physics.add.staticGroup();

    // ÁGUA
    this.walls.create(900, 1200, 'chest')
      .setDisplaySize(1800, 300)
      .refreshBody();

    // MONTANHA ESQUERDA
    this.walls.create(100, 300, 'chest')
      .setDisplaySize(200, 700)
      .refreshBody();

    // MONTANHA DIREITA
    this.walls.create(1800, 300, 'chest')
      .setDisplaySize(200, 700)
      .refreshBody();

    this.physics.add.collider(
      this.player,
      this.walls
    );

    // =========================
    // CÂMERA
    // =========================

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

    // =========================
    // CONTROLES
    // =========================

    this.cursors =
      this.input.keyboard.createCursorKeys();

    this.keyE =
      this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.E
      );

    // =========================
    // TEXTO
    // =========================

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

    // =========================
    // CONTROLES MOBILE
    // =========================

    this.leftButton = this.add.text(
      70,
      this.scale.height - 100,
      '⬅',
      {
        fontSize: '50px',
        backgroundColor: '#00000088',
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setScrollFactor(0)
    .setInteractive();

    this.rightButton = this.add.text(
      170,
      this.scale.height - 100,
      '➡',
      {
        fontSize: '50px',
        backgroundColor: '#00000088',
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setScrollFactor(0)
    .setInteractive();

    this.upButton = this.add.text(
      120,
      this.scale.height - 170,
      '⬆',
      {
        fontSize: '50px',
        backgroundColor: '#00000088',
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setScrollFactor(0)
    .setInteractive();

    this.downButton = this.add.text(
      120,
      this.scale.height - 30,
      '⬇',
      {
        fontSize: '50px',
        backgroundColor: '#00000088',
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setScrollFactor(0)
    .setInteractive();

    this.interactButton = this.add.text(
      this.scale.width - 100,
      this.scale.height - 100,
      'E',
      {
        fontSize: '50px',
        backgroundColor: '#ff4d6d',
        padding: {
          x: 20,
          y: 10
        }
      }
    )
    .setScrollFactor(0)
    .setInteractive();

    // =========================
    // FLAGS MOBILE
    // =========================

    this.mobileControls = {
      left: false,
      right: false,
      up: false,
      down: false
    };

    // =========================
    // EVENTOS MOBILE
    // =========================

    this.leftButton.on('pointerdown', () => {
      this.mobileControls.left = true;
    });

    this.leftButton.on('pointerup', () => {
      this.mobileControls.left = false;
    });

    this.rightButton.on('pointerdown', () => {
      this.mobileControls.right = true;
    });

    this.rightButton.on('pointerup', () => {
      this.mobileControls.right = false;
    });

    this.upButton.on('pointerdown', () => {
      this.mobileControls.up = true;
    });

    this.upButton.on('pointerup', () => {
      this.mobileControls.up = false;
    });

    this.downButton.on('pointerdown', () => {
      this.mobileControls.down = true;
    });

    this.downButton.on('pointerup', () => {
      this.mobileControls.down = false;
    });

    this.interactButton.on('pointerdown', () => {

      const distance =
        Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          this.chest.x,
          this.chest.y
        );

      if (distance < 80) {

        this.music.stop();

        this.scene.start('EndScene');
      }
    });

    // =========================
    // ANIMAÇÕES
    // =========================

    this.createAnimations();
  }

  createAnimations() {

    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers(
        'player',
        {
          start: 0,
          end: 3
        }
      ),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers(
        'player',
        {
          start: 4,
          end: 7
        }
      ),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers(
        'player',
        {
          start: 8,
          end: 11
        }
      ),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers(
        'player',
        {
          start: 12,
          end: 15
        }
      ),
      frameRate: 8,
      repeat: -1
    });
  }

  update() {

    const speed = 180;

    this.player.setVelocity(0);

    // ESQUERDA
    if (
      this.cursors.left.isDown ||
      this.mobileControls.left
    ) {

      this.player.setVelocityX(-speed);

      this.player.anims.play(
        'walk-left',
        true
      );
    }

    // DIREITA
    else if (
      this.cursors.right.isDown ||
      this.mobileControls.right
    ) {

      this.player.setVelocityX(speed);

      this.player.anims.play(
        'walk-right',
        true
      );
    }

    // CIMA
    else if (
      this.cursors.up.isDown ||
      this.mobileControls.up
    ) {

      this.player.setVelocityY(-speed);

      this.player.anims.play(
        'walk-up',
        true
      );
    }

    // BAIXO
    else if (
      this.cursors.down.isDown ||
      this.mobileControls.down
    ) {

      this.player.setVelocityY(speed);

      this.player.anims.play(
        'walk-down',
        true
      );
    }

    // PARADO
    else {

      this.player.anims.stop();
    }

    // DISTÂNCIA DO BAÚ
    // DISTÂNCIA DO NPC

const npcDistance =
  Phaser.Math.Distance.Between(
    this.player.x,
    this.player.y,
    this.npc.x,
    this.npc.y
  );

// PERTO DO NPC

if (npcDistance < 100) {

  this.message.setText(
    'Criança: O baú especial está escondido na floresta ❤️'
  );
}
    const distance =
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.chest.x,
        this.chest.y
      );

    // PERTO DO BAÚ
    if (distance < 80) {

      this.message.setText(
        'Pressione E para abrir o baú ❤️'
      );

      if (
        Phaser.Input.Keyboard.JustDown(
          this.keyE
        )
      ) {

        this.music.stop();

        this.scene.start('EndScene');
      }
    }

    // LONGE DO BAÚ
    else {

      this.message.setText(
        'Encontre o baú especial ❤️'
      );
    }
  }
}