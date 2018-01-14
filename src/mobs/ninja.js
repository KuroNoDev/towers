class Ninja {
  constructor(game, data) {
    this.game = game;
    this.data = data;
    this.create();
  }

  create() {
    let firstMove = this.data[0]

    if (firstMove.hasOwnProperty('delay')) firstMove.time = firstMove.time || 0;
    else {
      this.sprite = this.game.add.sprite(firstMove.x, firstMove.y, 'ninja');
      this.sprite.anchor = {x: 0.6, y: 0.6}
      firstMove.executed = true;
    }
  }

  update() {
    if (this.sprite && this.sprite.destroyed) return;
    let speed = this.data.speed;
  
    if (!this.sprite) {
      let firstMove = this.data[0]

      if (firstMove.time < firstMove.delay) {
        firstMove.time += speed;
      } else {
        this.sprite = this.game.add.sprite(firstMove.x, firstMove.y, 'ninja');
        this.sprite.anchor = {x: 0.6, y: 0.6}
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
        let randScale = this.game.rnd.realInRange(0.9, 1.1);

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
          this.sprite.scale.setTo(-1, randScale);
          executed = false;
        } else if (xDirection === 'left' && this.sprite.x > nextMove.x) {
          this.sprite.x -= xSpeed;
          this.sprite.scale.setTo(1, randScale);
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
    } else {
      this.sprite.destroyed = true;
      this.sprite.destroy();
    }
  }
}

export default Ninja;
