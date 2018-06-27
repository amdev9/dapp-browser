class UseLib {
  constructor(name) {
    try {
      return require('../library/' + name)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = UseLib