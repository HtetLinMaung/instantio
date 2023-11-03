const { socketid_map } = require("../constants");
const updateState = require("../utils/update-state");

module.exports = (socket) => (data) => {
  try {
    const { rooms, payload } = data;
    socket.to(rooms).emit("message", payload);
    updateState("message", {
      from: socketid_map[socket.id],
      to: rooms,
      payload,
    });
  } catch (err) {
    console.error(err);
  }
};
