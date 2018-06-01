const Frontend = require('./frontend')

const FrontEnd = new Frontend()

class Storage { // rewrite https://pouchdb.com/2015/03/05/taming-the-async-beast-with-es7.html
  async insert(response) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.message || {})

    await new Promise(resolve => {
      db.storage.post(object).then(resolve)
    })

    response.payload.response = object
    FrontEnd.complete(response.payload)
  }

  async find(response) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.where || {})

    response.payload.response = await new Promise(resolve => {
      db.storage.find({
        selector: object
      }).then(response => resolve(response.docs))
    })

    FrontEnd.complete(response.payload)
  }

  async update(response) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.where || {})
    const message = response.payload.message

    const data = await new Promise(resolve => {
      db.storage.find({
        selector: object
      }).then(response => resolve(response.docs))
    })

    data.forEach(item => {
      db.storage.put(Object.assign(item, message))
    })

    FrontEnd.complete(response.payload)
  }

  async remove(response) {
    const object = Object.assign({
      hash: response.from
    }, response.payload.where || {})

    const data = await new Promise(resolve => {
      db.storage.find({
        selector: object
      }).then(response => resolve(response.docs))
    })

    data.forEach(item => db.storage.remove(item))

    FrontEnd.complete(response.payload)
  }
}

module.exports = Storage;