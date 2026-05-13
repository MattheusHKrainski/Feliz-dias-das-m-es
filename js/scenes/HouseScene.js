// js/scenes/HouseScene.js
// Quarto inicial — a personagem acorda aqui
 
var HouseScene = new Phaser.Class({
  Extends: Phaser.Scene,
 
  initialize: function () {
    Phaser.Scene.call(this, { key: 'HouseScene' });
  },
 
  create: function () {
    var W = this.scale.width;
    var H = this.scale.height;
    var self = this;
 
    this.cameras.main.setBackgroundColor('#1a1a2e');
    this.cameras.main.fadeIn(1500);
 
    this._dialogOpen = false;
    this._dialogStep = 0;
    this._canLeave   = false;
 
    // ── Desenha o quarto ─────────────────────────
    this._drawRoom();
 
    // ── Player no centro da cama ─────────────────
    this.player = this.add.sprite(W / 2, H * 0.42, 'player_sheet', 0)
      .setScale(0.09)
      .setDepth(5);
    // Remove fundo preto: blendMode ADD mostra só os pixels coloridos
    this.player.setBlendMode(Phaser.BlendModes.NORMAL);
    // Alternativa para fundo preto: recortar via tint não funciona bem,
    // então usamos a versão com scale pequeno e aceitamos a borda escura
    // (idealmente o PNG teria transparência)
 
    // ── Caixa de diálogo de acordar ──────────────
    this.time.delayedCall(800, function () {
      self._showDialog([
        '...',
        '*Você acorda com a luz entrando\npela janela...*',
        'Hoje é Dia das Mães! 🌸',
        'Você prometeu fazer algo\nespecial para a Mãe...',
        'Mas o presente sumiu!\nPreciso procurar na cidade.',
        '[ Saia pela porta para\ncomeçar a aventura ]'
      ]);
    });
 
    // ── Botão de ação (A) ─────────────────────────
    this._buildMobileControls();
 
    // ── Porta (zona de saída) ─────────────────────
    this._door = this.add.rectangle(W / 2, H * 0.88, 44, 8, 0x8B4513)
      .setDepth(3);
 
    // ── Zona clicável da porta ────────────────────
    var doorZone = this.add.zone(W / 2, H * 0.9, 60, 40).setInteractive();
    doorZone.on('pointerdown', function () {
      if (self._canLeave && !self._dialogOpen) self._leaveHouse();
    });
  },
 
  // ─── Desenha o quarto pixel-art ────────────────
  _drawRoom: function () {
    var W = this.scale.width;
    var H = this.scale.height;
    var g = this.add.graphics().setDepth(0);
 
    // Chão
    g.fillStyle(0x8B6914);
    g.fillRect(0, H * 0.3, W, H * 0.7);
 
    // Parede fundo
    g.fillStyle(0xd4a8d4);
    g.fillRect(0, 0, W, H * 0.32);
 
    // Rodapé
    g.fillStyle(0x6B4A0A);
    g.fillRect(0, H * 0.3, W, 6);
 
    // Janela
    g.fillStyle(0x87CEEB);
    g.fillRect(W * 0.65, H * 0.06, 70, 70);
    g.fillStyle(0xffffff, 0.3);
    g.fillRect(W * 0.65, H * 0.06, 70, 70);
    g.lineStyle(4, 0x8B4513);
    g.strokeRect(W * 0.65, H * 0.06, 70, 70);
    g.lineStyle(2, 0x8B4513);
    g.lineBetween(W * 0.65 + 35, H * 0.06, W * 0.65 + 35, H * 0.06 + 70);
    g.lineBetween(W * 0.65, H * 0.06 + 35, W * 0.65 + 70, H * 0.06 + 35);
    // Luz solar
    g.fillStyle(0xFFFF88, 0.15);
    g.fillTriangle(W * 0.65 + 35, H * 0.06 + 70, W * 0.3, H * 0.7, W * 0.9, H * 0.7);
 
    // Cama
    g.fillStyle(0xcc6688);
    g.fillRect(W * 0.18, H * 0.34, W * 0.64, H * 0.22);
    g.fillStyle(0xeeddee);
    g.fillRect(W * 0.18, H * 0.34, W * 0.64, H * 0.07); // travesseiro
    g.fillStyle(0xff88aa);
    g.fillRect(W * 0.22, H * 0.355, W * 0.56, H * 0.04);
    g.lineStyle(3, 0x994466);
    g.strokeRect(W * 0.18, H * 0.34, W * 0.64, H * 0.22);
 
    // Mesinha de cabeceira
    g.fillStyle(0x8B4513);
    g.fillRect(W * 0.04, H * 0.38, 42, 52);
    // Despertador
    g.fillStyle(0xdddddd);
    g.fillCircle(W * 0.04 + 21, H * 0.38 + 16, 12);
    g.fillStyle(0xff4444);
    g.fillRect(W * 0.04 + 16, H * 0.38 + 11, 2, 6);
    g.fillRect(W * 0.04 + 21, H * 0.38 + 11, 2, 6);
 
    // Tapete
    g.fillStyle(0x9966cc, 0.5);
    g.fillEllipse(W / 2, H * 0.72, W * 0.7, 60);
 
    // Porta
    g.fillStyle(0x5C3010);
    g.fillRect(W / 2 - 24, H * 0.8, 48, 80);
    g.fillStyle(0x8B4513);
    g.fillRect(W / 2 - 22, H * 0.8 + 2, 44, 76);
    g.fillStyle(0xFFD700);
    g.fillCircle(W / 2 + 14, H * 0.8 + 40, 5);
    // Texto porta
    this.add.text(W / 2, H * 0.96, '[ PORTA ]', {
      fontSize: '10px', color: '#aaaaaa', fontFamily: 'monospace'
    }).setOrigin(0.5).setDepth(4);
  },
 
  // ─── Sistema de diálogo ─────────────────────────
  _showDialog: function (lines) {
    var W = this.scale.width;
    var H = this.scale.height;
    var self = this;
    this._dialogOpen = true;
    this._dialogLines = lines;
    this._dialogStep  = 0;
 
    if (this._dialogBox) this._dialogBox.destroy();
    this._dialogBox = this.add.container(0, H * 0.72).setDepth(20);
 
    var bg = this.add.rectangle(W / 2, 0, W - 20, 130, 0x000022, 0.92)
      .setStrokeStyle(2, 0xff88aa);
    var txt = this.add.text(20, -50, '', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'monospace',
      wordWrap: { width: W - 50 },
      lineSpacing: 4
    });
    var arrow = this.add.text(W - 36, 46, '▼', {
      fontSize: '12px', color: '#ff88aa', fontFamily: 'monospace'
    });
    this.tweens.add({ targets: arrow, alpha: 0.2, duration: 500, yoyo: true, repeat: -1 });
 
    this._dialogBox.add([bg, txt, arrow]);
    this._dialogTxt = txt;
 
    this._advanceDialog();
 
    // Toque em qualquer lugar avança
    if (this._dialogTapHandler) {
      this.input.off('pointerdown', this._dialogTapHandler);
    }
    this._dialogTapHandler = function (ptr) {
      if (ptr.y < H * 0.72) return; // só toque na caixa
      self._advanceDialog();
    };
    this.input.on('pointerdown', this._dialogTapHandler);
  },
 
  _advanceDialog: function () {
    if (this._dialogStep >= this._dialogLines.length) {
      this._closeDialog();
      return;
    }
    this._dialogTxt.setText(this._dialogLines[this._dialogStep]);
    this._dialogStep++;
  },
 
  _closeDialog: function () {
    this._dialogOpen = false;
    if (this._dialogBox) { this._dialogBox.destroy(); this._dialogBox = null; }
    if (this._dialogTapHandler) {
      this.input.off('pointerdown', this._dialogTapHandler);
      this._dialogTapHandler = null;
    }
    this._canLeave = true;
    // Pisca a porta
    this.tweens.add({
      targets: this._door,
      alpha: 0.3,
      duration: 400,
      yoyo: true,
      repeat: 4
    });
  },
 
  // ─── Controles mobile ───────────────────────────
  _buildMobileControls: function () {
    var W = this.scale.width;
    var H = this.scale.height;
    var self = this;
 
    // Botão A (ação / avançar diálogo)
    var btnA = this.add.text(W - 30, H - 30, ' A ', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'monospace',
      backgroundColor: '#cc2244',
      padding: { x: 10, y: 6 }
    }).setOrigin(1, 1).setDepth(30).setInteractive({ useHandCursor: true });
 
    btnA.on('pointerdown', function () {
      if (self._dialogOpen) {
        self._advanceDialog();
      } else if (self._canLeave) {
        self._leaveHouse();
      }
    });
  },
 
  _leaveHouse: function () {
    var self = this;
    this.cameras.main.fadeOut(800);
    this.time.delayedCall(820, function () {
      self.scene.start('WorldScene');
    });
  }
});