class Angery {
  constructor(game, data) {
    console.log(this, data)
    this.game = game;
    this.data = data;
    this.create();
  }

  create() {
    this.sprite = this.game.add.sprite(this.data[0].x, this.data[0].y, 'angery');
  }

  update() {
    let nextMove = this.data.find(x => !x.executed)
    if(nextMove) {
      let previousMove = this.data[this.data.indexOf(nextMove) - 1]
      let xDirection = nextMove.x - previousMove.x >= 0 ? 'right' : 'left';
      let yDirection = nextMove.y - previousMove.y >= 0 ? 'down' : 'up';

      if (xDirection === 'right' && this.sprite.x < nextMove.x) {
        this.sprite.x += 2;
      } else if (yDirection === 'down' && this.sprite.y < nextMove.y) {
        this.sprite.y += 2;
      } else {
        nextMove.executed = true;
      }
    }
  }
}

export default Angery;
