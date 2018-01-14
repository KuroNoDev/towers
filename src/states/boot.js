class Boot extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.game.load.image('angery', 'assets/angery.png');
    this.game.load.image('ninja', 'assets/ninja.png');
    this.game.load.image('tower-1', 'assets/tower-1.png');
    this.game.load.image('tower-2', 'assets/tower-2.png');
    this.game.load.image('tower-3', 'assets/tower-3.png');
    this.game.load.image('tower-4', 'assets/tower-4.png');
    this.game.load.image('tower-5', 'assets/tower-5.png');
    this.game.load.image('tower-6', 'assets/tower-6.png');
    this.game.load.image('tower-7', 'assets/tower-7.png');
    this.game.load.image('tower-8', 'assets/tower-8.png');
    this.game.load.image('tower-9', 'assets/tower-9.png');
    this.game.load.image('tower-10', 'assets/tower-10.png');
  }

  create() {
    // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start('game');
  }
}

export default Boot;
