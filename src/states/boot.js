class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.game.load.image('angery', 'assets/angery.png');
    this.game.load.image('rock', 'assets/rock.png');
  }

  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start('game');
  }
}

export default Boot;
