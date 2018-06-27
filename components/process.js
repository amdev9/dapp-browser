

class ProcessBus {
  constructor() {
    this.handlers = {}
  }

  async publish(to, message_type, payload) {
    // initialized by sandbox global.process
    process.send({
      to: to,
      message_type: message_type,
      payload: payload
    })
  }

  async subscribe(message_type, func) {
    if (!this.handlers[message_type]) this.handlers[message_type] = []
    this.handlers[message_type].push(func)
  }

  async inject(message) {
    const handlers = this.handlers[message.message_type] || []
    handlers.forEach(func => func(message))
  }
}

module.exports = ProcessBus;