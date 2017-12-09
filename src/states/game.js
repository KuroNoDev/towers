import Angery from '../mobs/angery';

class Game {

  constructor() {

  }

  preload() {
    this.game.load.image('angery', 'assets/angery.png');
  }

  create() {
    this.generateMobs();
  }

  generateMobs() {
    this.mobs = [];
    let number = 10;
    for (let index = 0; index < number; index++) {
      this.mobs.push(new Angery(this.game))
    }
  }

  update() {
    this.mobs.forEach((mob) => { mob.update(); })
  }

}

export default Game;
