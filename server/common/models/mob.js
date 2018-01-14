'use strict';

let loopback = require('loopback')

module.exports = function(Mob) {
  Mob.current = (id, cb) => {
    let Game = loopback.getModel('game')
    let fixedRandom = Math.random()

    return new Promise((resolve, reject) => {
      Game.find().then((game) => {
        game = game.pop()

        Mob.find().then((data) => {
          let mob = data.find(x => Date.now() - game.startTime < x.time)
          if (!mob) {
            reject({message: 'game is not runnning'})
          }

          mob.mobs = []
  
          for (let index = 0; index < mob.count; index++) {
            mob.mobs.push(JSON.parse(JSON.stringify(mob.pattern)))
          }
  
          mob.mobs.forEach((_mob, index) => {
            _mob.forEach((__mob) => {
              Object.keys(__mob).forEach((prop) => {
                __mob[prop] = eval(__mob[prop])
              })
            })
          })

          mob = Object.assign({timeRemaining: mob.time - (Date.now() - game.startTime)}, mob.__data)
          resolve(mob)
        })
      })
    })
  }

  Mob.remoteMethod('current', {
    description: 'get current mobs',
    accepts: [],
    returns: {
      root: true,
      type: 'array'
    },
    http: {
      path: '/current',
      verb: 'get'
    }
  })
};
