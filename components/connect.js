const url = require('url');
const Facade = require('./global');

class Connect {
  constructor() {
      Facade.io().on('connection', socket => {
      socket.on('room', room => {
        const refURL = new URL(socket.handshake.headers.referer);
        const targetId = headers['allow-origin'] ? headers['allow-origin'] : refURL.pathname.split('/')[1].shift();
        socket.join(room + targetId);
      })
    })
  }

  async broadcast(response) {
    const message = response.payload.message;
    const payload = JSON.parse(message);
    Facade.io().sockets.in(payload.room).emit('message', message);
  }

  async joined(response) {
    const object = response.payload.message;
    Facade.io().sockets.in(object.room).emit('joined', object.peers);
  }

  async detached(response) {
    const object = response.payload.message;
    Facade.io().sockets.in(object.room).emit('detached', object.peers);
  }
}

module.exports = Connect;