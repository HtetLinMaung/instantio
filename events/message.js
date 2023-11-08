const { log } = require("starless-logger");
const { socketid_map } = require("../constants");
const updateState = require("../utils/update-state");

module.exports = (socket, namespace) => (data) => {
  try {
    const { rooms, payload } = data;
    socket.to(rooms).emit("message", payload);
    log(
      `[${namespace}] room ${
        socketid_map[socket.id]
      } emitted message event with data: ${JSON.stringify(data)}`,
      "info",
      {
        timestampFormat: "DD/mm/yyyy hh:mm:ss a",
      }
    );
    updateState("message", {
      from: socketid_map[socket.id],
      to: rooms,
      payload,
    });
  } catch (err) {
    console.error(err);
  }
};
