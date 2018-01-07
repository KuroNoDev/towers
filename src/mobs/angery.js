class Angery {
  constructor(game, data) {
    // console.log(this, data)
    this.game = game;
    this.data = data;
    this.create();
  }

  create() {
    let firstMove = this.data[0]

    if (firstMove.hasOwnProperty('delay')) firstMove.time = firstMove.time || 0;
    else {
      this.sprite = this.game.add.sprite(firstMove.x, firstMove.y, 'angery');
      firstMove.executed = true;
    }
  }

  update() {
    let speed = 3;
  
    if (!this.sprite) {
      let firstMove = this.data[0]

      if (firstMove.time < firstMove.delay) {
        firstMove.time += speed;
      } else {
        this.sprite = this.game.add.sprite(firstMove.x, firstMove.y, 'angery');
        firstMove.executed = true;
      }

      return
    }

    let nextMove = this.data.find(x => !x.executed)

    if (nextMove) {
      let previousMove = this.data[this.data.indexOf(nextMove) - 1]
      let executed = true;

      if (nextMove.hasOwnProperty('delay')) nextMove.time = nextMove.time || 0;
      if (nextMove.hasOwnProperty('delay') && nextMove.time < nextMove.delay) {
        nextMove.time += speed;
        executed = false;
      } else {
        let xDirection = nextMove.x - previousMove.x >= 0 ? 'right' : 'left';
        let yDirection = nextMove.y - previousMove.y >= 0 ? 'down' : 'up';
        let xDistance, yDistance, xSpeed, ySpeed;

        xDistance = xDirection === 'right'
          ? Math.abs(nextMove.x - this.sprite.x)
          : Math.abs(this.sprite.x - nextMove.x)

        yDistance = yDirection === 'down'
          ? Math.abs(nextMove.y - this.sprite.y)
          : Math.abs(this.sprite.y - nextMove.y)

        xSpeed = xDistance > yDistance
          ? speed
          : speed / ((yDistance / xDistance))

        ySpeed = yDistance > xDistance
          ? speed
          : speed / ((xDistance / yDistance))
        
        if (xDirection === 'right' && this.sprite.x < nextMove.x) {
          this.sprite.x += xSpeed;
          executed = false;
        } else if (xDirection === 'left' && this.sprite.x > nextMove.x) {
          this.sprite.x -= xSpeed;
          executed = false;
        }
        
        if (yDirection === 'down' && this.sprite.y < nextMove.y) {
          this.sprite.y += ySpeed;
          executed = false;
        } else if (yDirection === 'up' && this.sprite.y > nextMove.y) {
          this.sprite.y -= ySpeed;
          executed = false;
        }
      }

      if (executed) {
        nextMove.executed = true;
      }
    }
  }
}

export default Angery;
