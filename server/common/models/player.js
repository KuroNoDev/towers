'use strict';
let bcrypt = require('bcrypt-nodejs')

module.exports = function(Player) {
  Player.observe('before save', (ctx, next) => {
    if (ctx.isNewInstance) {
      ctx.instance.password = bcrypt.hashSync(ctx.instance.password)
      next()
    } else {
      Player.findById(ctx.instance.id).then((data) => {
        if (!data) {
          let err = new Error("ID not found")
          err.statusCode = 400
          next(err)
        } else if (bcrypt.compareSync(ctx.instance.password, data.password)) {
          Object.keys(data.__data).forEach((prop) => {
            if (prop !== 'towers') ctx.instance[prop] = data[prop]
          })
          next()
        } else {
          let err = new Error("Wrong password")
          err.statusCode = 401
          next(err)
        }
      }, (error) => {
        next(error)
      })
    }
  })
};
