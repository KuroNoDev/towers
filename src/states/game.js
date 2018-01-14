import Angery from '../mobs/angery';
import Ninja from '../mobs/ninja';
import Tower from '../towers/tower';

const baseUrl = 'http://localhost:3000/api/'

class Game {

  constructor () {
    this.towers = [];
    this.mobs = [];
    this.preview = true;
    this.running = false;
  }

  create () {
    this.getCurrentMob()
    this.timer = this.game.add.text(1280, 0, '', {
      font: '20px Arial',
      fill: '#000',
      stroke: '#fff',
      strokeThickness: 5
    });
    this.timer.anchor = {x: 1, y: 0};
  }

  getCurrentMob () {
    $.get(`${baseUrl}mobs/current`, (response) => {
      this.mob = response;
      this.currentDate = Date.now();
      if (this.preview) this.generateMobs();
    }).fail((error) => {
      console.error(error.responseJSON.error.message)
    });
  }

  generateTowers () {
    $.get(`${baseUrl}players`, (response) => {
      this.generateMobs();
      this.players = response;
      response.forEach((player) => {
        player.towers.forEach((tower, index) => {
          if (index >= 3) return;
          tower.player = player.name;
          tower.towerType = player.towerType;
          tower.score = 0;
          this.towers.push(new Tower(this.game, tower, this.mobs, this.towers));
        })
      });
    });
  }

  generateMobs () {
    this.mobs = [];
    this.mob.mobs.forEach((mob) => {
      mob.speed = mob.speed || this.mob.speed;

      if (this.mob.mobType === 'Angery') {
        this.mobs.push(new Angery(this.game, mob))
      } else if (this.mob.mobType === 'Ninja') {
        this.mobs.push(new Ninja(this.game, mob))
      }
    });
  }

  update () {
    if (!this.mob) return;

    let elapsedTime = (Date.now() - this.currentDate);
    let totalSeconds = (this.mob.timeRemaining - elapsedTime) / 1000;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (hours <= 0 && minutes <= 0 && seconds <= 60) {
      this.preview = false;
      this.timer.addColor('#f00', 0);
    }

    if (hours <= 0 && minutes <= 0 && seconds <= 45) {
      if (!this.getFinalMob) {
        this.getFinalMob = true;
        this.getCurrentMob();
      }
    }

    if (hours > 0 || minutes > 0 || seconds > 0) {
      this.timer.setText(`mm:${Math.ceil(minutes)} ss:${Math.ceil(seconds)}`);
    } else {
      if (!this.running) {
        this.running = true;
        this.timer.setText(`Wave ${this.mob.id}`);
        this.generateTowers();
      }
    }

    this.mobs.forEach((mob, index) => { 
      mob.update();
      if (mob.sprite && mob.sprite.destroyed) {
        this.mobs.splice(index, 1);
      }

      if (this.mobs.length === 0 && this.preview) {
        this.getCurrentMob();
      } else if (this.mobs.length === 0 && this.running) {
        this.postScores();
      }
    })

    if (this.running) {
      this.towers.forEach((tower) => { tower.update(); })
    }
  }

  postScores () {
    let playerCount = this.players.length;
    let successPostCount = 0;

    this.players.forEach((player) => {
      let filter = encodeURIComponent(`{"where": {"playerId":${player.id}}}`);
      $.get(`${baseUrl}scores/findOne?filter=${filter}`, (response) => {
        let id = response.id;
        response.towers[`"${this.mob.id}"`] = player.towers;
        delete response.id;
        $.post(`${baseUrl}scores/${id}/replace`, response, (response) => {
          successPostCount += 1;

          if (successPostCount >= playerCount) {
            setTimeout(() => {
              location.reload();
            }, 5000);
          }
        })
      }).fail((error) => {
        let score = {
          name: player.name,
          playerId: player.id,
          towers: {},
          total: 0
        }

        score.towers[`"${this.mob.id}"`] = player.towers;
        $.post(`${baseUrl}scores`, score)
      });
    })
  }

}

export default Game;