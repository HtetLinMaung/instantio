require("dotenv").config();

const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { initSocketIO, getIO } = require("./utils/socket");
const {
  PORT,
  SOCKETIO_CONFIG_PATH,
  SOCKETIO_NAMESPACES,
} = require("./constants");
const join = require("./events/join");
const emit = require("./routes/emit");
const disconnect = require("./events/disconnect");
const message = require("./events/message");
const { log } = require("starless-logger");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/instantio/emit", emit);

const httpServer = createServer(app);
let socketio_config = {};
if (fs.existsSync(SOCKETIO_CONFIG_PATH)) {
  socketio_config = require(SOCKETIO_CONFIG_PATH);
}
const io = initSocketIO(httpServer, socketio_config);

io.on("connection", (socket) => {
  socket.on("join", join(socket, "/", io));
  socket.on("disconnect", disconnect(socket, "/", io));
  socket.on("message", message(socket, "/", io));
});

for (const namespace of SOCKETIO_NAMESPACES) {
  log(`SocketIO listening on ${namespace}`, "info", {
    timestampFormat: "DD/mm/yyyy hh:mm:ss a",
  });
  getIO(namespace).on("connection", (socket) => {
    socket.on("join", join(socket, namespace, io));
    socket.on("disconnect", disconnect(socket, namespace, io));
    socket.on("message", message(socket, namespace, io));
  });
}

io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

httpServer.listen(PORT, () =>
  log(`Server listening on ${PORT}`, "info", {
    timestampFormat: "DD/mm/yyyy hh:mm:ss a",
  })
);
