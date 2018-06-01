const express = require('express')
const URLCut = require('../components/urlcut')
const UseLib = require('../components/uselib')
const UserDappsLoader = require('../components/user.loader')
const SystemDappsLoader = require('../components/system.loader')

const router = express.Router()
const system = new UseLib('system.id')

const systems = new SystemDappsLoader()
systems.onStart()

const users = new UserDappsLoader()
users.onStart()

router.post('/', async function(request, response, next) {
  const pins = await new Promise(resolve => {
    db.setting.find({
      selector: {
        type: 'pin'
      }
    }).then(response => resolve(response.docs))
  })

  const setting = await new Promise(resolve => {
    db.setting.find({
      selector: {
        type: 'setting'
      }
    }).then(response => resolve(response.docs))
  })

  for (let i = 0; i < setting.length; i++) {
    for (const key in setting[i]) {
      setting[i][key] = decodeURIComponent(setting[i][key])
    }
  }

  pins.forEach((item, index) => {
    for (let i = 0; i < users.items.length; i++) {
      if (item._id == users.items[i].hash) pins.splice(index, 1, users.items[i])
    }
  })

  response.send({
    pins: pins,
    system: system,
    setting: setting,
    userapps: users.items
  })
})

router.post('/setting.pin', async function(request, response, next) {
  const target = URLCut(request.headers)
  const object = request.body.message

  if (target.length || !('_id' in object)) return response.send({
    status: false
  })

  await new Promise((resolve, reject) => {
    db.setting.get(object._id).then(resolve).catch(reject)
  }).then(doc => {
    db.setting.remove(doc)
  }).catch(error => {
    db.setting.put(object)
  })

  response.send({
    status: true
  })
})

router.post('/setting.setting', async function(request, response, next) {
  const target = URLCut(request.headers)
  const object = request.body.message

  if (target.length || !('_id' in object)) return response.send({
    status: false
  })

  await new Promise((resolve, reject) => {
    db.setting.get(object._id).then(resolve).catch(reject)
  }).then(doc => object._rev = doc._rev).catch(error => {})

  db.setting.put(object)

  response.send({
    status: true
  })
})

module.exports = router