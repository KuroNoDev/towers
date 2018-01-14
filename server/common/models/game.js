'use strict';

module.exports = function(Game) {
  Game.startGame = (cb) => {
    return new Promise((resolve, reject) => {
      Game.find().then((status) => {
        status = status.pop()
        status.startTime = Date.now()
      
        Game.replaceOrCreate(status).then((data) => {
          resolve(data)
        })
      })
    })
  }

  Game.remoteMethod('startGame', {
    description: 'start the game',
    accepts: [],
    returns: {
      root: true,
      type: 'object'
    },
    http: {
      path: '/start',
      verb: 'post'
    }
  })
};
