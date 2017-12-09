class Angery {
  constructor(game) {
    console.log(this)
    this.game = game;
    this.create();
  }

  create() {
    this.sprite = this.game.add.sprite(Math.random() * 500 + 500, Math.random() * 500 + 100, 'angery');
    this.sprite.width = 50;
    this.sprite.height = 50;
  }

  update() {
    this.sprite.x += Math.random() * 2 - 1;
    this.sprite.y += Math.random() * 2 - 1;
  }
}

export default Angery;
