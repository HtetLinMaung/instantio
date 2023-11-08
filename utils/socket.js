const { Server } = require("socket.io");

let io;

exports.initSocketIO = (httpServer, options = {}) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
    ...options,
  });
  return io;
};

exports.getIO = (namespace = "/") => {
  if (namespace == "/") {
    return io;
  }
  return io.of(namespace);
};
