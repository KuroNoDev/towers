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
    let mobs = [
      [{x: 0, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -50, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -100, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -150, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -200, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
    ];

    mobs.forEach((mob) => {
      this.mobs.push(new Angery(this.game, mob))
    });
  }

  update() {
    this.mobs.forEach((mob) => { mob.update(); })
  }

}

export default Game;
