class Rock {
  constructor(game, data, mobs, towers) {
    this.game = game;
    this.data = data;
    this.mobs = mobs;
    this.towers = towers;
    this.lasers = [];
    this.create();
  }

  create () {
    let style = {
      font: '14px Arial',
      fill: '#000',
      stroke: '#fff',
      strokeThickness: 3,
      align: 'center',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    }

    this.sprite = this.game.add.sprite(this.data.x, this.data.y, this.data.towerType);
    this.text = this.game.add.text(this.data.x, this.data.y, `${this.data.player}\n${this.data.score}`, style);
    this.text.lineSpacing = -10;
    this.sprite.anchor = {x: 0.5, y: 0.5};
    this.text.anchor = {x: 0.5, y: -0.8};
  }

  updateScore () {
    // let towers = this.towers.filter(x => x.data.player === this.data.player);
    // let score = 0

    // towers.forEach((tower) => {
    //   score += tower.data.score;
    // });

    this.text.setText(`${this.data.player}\n${this.data.score / 100}`);
  }

  update () {
    let hit = false

    this.mobs.forEach((mob) => {
      if (!mob.sprite || mob.sprite.destroyed) return;
      if (Math.sqrt( Math.pow((mob.sprite.x - this.sprite.x), 2) + Math.pow((mob.sprite.y - this.sprite.y), 2) ) < 100 ) {
        let laser = this.lasers.find(laser => laser.mob === mob)
        let newLine, newLaser

        if (!laser) {
          newLine = new Phaser.Line(this.sprite.x, this.sprite.y, mob.sprite.x, mob.sprite.y);
          newLaser = this.game.add.graphics(0, 0);

          this.lasers.push({
            mob: mob,
            line: newLine,
            sprite: newLaser
          })
        } else {
          let af = '345abcdef';
          laser.line.fromSprite(this.sprite, mob.sprite, false);
          laser.sprite.clear();
          laser.sprite.lineStyle(3, `0x${af.charAt(Math.floor(Math.random() * af.length))}${af.charAt(Math.floor(Math.random() * af.length))}0000`, 1);
          laser.sprite.moveTo(laser.line.start.x, laser.line.start.y);
          laser.sprite.lineTo(laser.line.end.x, laser.line.end.y);
          laser.sprite.endFill();
        }

        this.data.score += 1;
        this.text.addColor('#f00', 0);
        hit = true
      } else {
        let index = this.lasers.findIndex(laser => laser.mob === mob)
        if (index !== -1) {
          this.lasers[index].sprite.clear()
          this.lasers.splice(index, 1)
        }
      }
    });

    if (!hit) this.text.addColor('#000', 0)

    for (let index = this.lasers.length - 1; index >= 0; index--) {
      let laser = this.lasers[index];
      if (laser.mob.sprite.destroyed) {
        laser.sprite.clear()
        this.lasers.splice(index, 1)
      }
    }

    this.updateScore()
  }
}
  
export default Rock;
  