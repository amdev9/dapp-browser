const URLCut = require("./urlcut");

class Connect {
  constructor() {
    io.on("connection", socket => {
      socket.on("room", room => {
        const target = URLCut(socket.handshake.headers);
        socket.join(room + target);
      });
    });
  }

  async broadcast(response) {
    const object = JSON.parse(response.payload.message);
    io.sockets.in(object.room).emit("message", response.payload.message);
  }

  async joined(response) {
    const object = response.payload.message;
    io.sockets.in(object.room).emit("joined", object.peers);
  }

  async detached(response) {
    const object = response.payload.message;
    io.sockets.in(object.room).emit("detached", object.peers);
  }
}

module.exports = Connect;
