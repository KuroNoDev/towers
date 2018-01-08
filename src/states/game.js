import Angery from '../mobs/angery';
import Rock from '../towers/rock';

class Game {

  constructor () {
    this.towers = [];
    this.mobs = [];
  }

  preload () {
    this.game.load.image('angery', 'assets/angery.png');
  }

  create () {
    this.generateTowers();
    this.generateMobs();
  }

  generateTowers () {
    let towers = [
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'AUF-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'AUF-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'AUF-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'HAU-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'HAU-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'HAU-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'TORO-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'TORO-001', score: 0},
      {x: Math.random() * 1270, y: Math.random() * 720, player: 'TORO-001', score: 0}
    ];

    towers.forEach((tower) => {
      this.towers.push(new Rock(this.game, tower, this.mobs, this.towers))
    });
  }

  generateMobs () {
    let x = (Math.random() * 1270);

    let mobs = [
      [{x: x + 0, y: 0}, {x: x + 250, y: 250}, {x: x + 0, y: 250}, {x: x + 250, y: 500}],
      [{x: x + 500, y: 0}, {x: x + 250, y: 250}, {x: x + 500, y: 250}, {x: x + 250, y: 500}],
      [{x: x + 250, y: 0}, {x: x + 250, y: 250}, {x: x + 250, y: 500}],
      [{x: x + 0, y: 0, delay: 45}, {x: x + 250, y: 250}, {x: x + 500, y: 500}, {x: x + 250, y: 500}],
      [{x: x + 500, y: 0, delay: 45}, {x: x + 250, y: 250}, {x: x + 0, y: 500}, {x: x + 250, y: 500}],
      [{x: x + 250, y: 0, delay: 45}, {x: x + 250, y: 250}, {x: x + 250, y: 500}],
      [{x: 0, y: 25, executed: true}, {x: 640, y: 25}, {x: 640, y: 720}],
      [{x: -50, y: 25, executed: true}, {x: 640, y: 25}, {x: 640, y: 720}],
      [{x: -100, y: 25, executed: true}, {x: 640, y: 25}, {x: 640, y: 720}],
      [{x: -150, y: 25, executed: true}, {x: 640, y: 25}, {x: 640, y: 720}],
      [{x: -200, y: 25, executed: true}, {x: 640, y: 25}, {x: 640, y: 720}]
    ];

    for (let index = 0; index < 100; index++) {
      mobs.push([{x: Math.random() * 1270, y: Math.random() * 720, delay: Math.random() * 1000 + 1500}, {x: Math.random() * 1270, y: Math.random() * 720}])
    }

    mobs.forEach((mob) => {
      this.mobs.push(new Angery(this.game, mob))
    });
  }

  update () {
    this.mobs.forEach((mob, index) => { 
      mob.update();
      if (mob.sprite && mob.sprite.destroyed) {
        this.mobs.splice(index, 1)
      }
    })

    this.towers.forEach((tower) => { tower.update(); })
  }

}

export default Game;
