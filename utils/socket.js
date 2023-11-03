const { Server } = require("socket.io");
const { SOCKETIO_NAMESPACE } = require("../constants");

let io;

exports.initSocketIO = (httpServer, options = {}) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
    ...options,
  });
  if (SOCKETIO_NAMESPACE) {
    io = io.of(SOCKETIO_NAMESPACE);
  }
  return io;
};

exports.getIO = () => {
  return io;
};
