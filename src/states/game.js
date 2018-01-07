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

    let x = (Math.random() * 1270);

    let mobs = [
      [{x: x + 0, y: 0}, {x: x + 250, y: 250}, {x: x + 0, y: 250}, {x: x + 250, y: 500}],
      [{x: x + 500, y: 0}, {x: x + 250, y: 250}, {x: x + 500, y: 250}, {x: x + 250, y: 500}],
      [{x: x + 250, y: 0}, {x: x + 250, y: 250}, {x: x + 250, y: 500}],
      [{x: x + 0, y: 0, delay: 45}, {x: x + 250, y: 250}, {x: x + 500, y: 500}, {x: x + 250, y: 500}],
      [{x: x + 500, y: 0, delay: 45}, {x: x + 250, y: 250}, {x: x + 0, y: 500}, {x: x + 250, y: 500}],
      [{x: x + 250, y: 0, delay: 45}, {x: x + 250, y: 250}, {x: x + 250, y: 500}],
      [{x: 0, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -50, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -100, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -150, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}],
      [{x: -200, y: 0, executed: true}, {x: 500, y: 0}, {x: 500, y: 500}]
    ];

    for (let index = 0; index < 100; index++) {
      mobs.push([{x: Math.random() * 1270, y: Math.random() * 720, delay: Math.random() * 1000 + 1500}, {x: Math.random() * 1270, y: Math.random() * 720}])
    }

    mobs.forEach((mob) => {
      this.mobs.push(new Angery(this.game, mob))
    });
  }

  update() {
    this.mobs.forEach((mob) => { mob.update(); })
  }

}

export default Game;
