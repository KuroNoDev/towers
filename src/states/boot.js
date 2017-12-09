class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.game.load.image('angery', 'assets/angery.png');
  }

  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start('game');
  }
}

export default Boot;
