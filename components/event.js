const Events = require("events");

const Emitter = new Events();

class EventBus {
  constructor() {
    this.data = {};
  }

  async publish(to, message_type, payload) {
    const object = {
      from: this.data.hash,
      message_type: payload.message_type,
      payload: payload
    };

    Emitter.emit(to, object);
    Emitter.emit(message_type + to, object);
  }

  async subscribe(message_type, func) {
    Emitter.on(message_type + this.data.hash, message => func(message));
  }

  async everytime(func) {
    Emitter.on(this.data.hash, message => func(message));
  }
}

module.exports = EventBus;
