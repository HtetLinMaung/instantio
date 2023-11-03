const { log } = require("starless-logger");
const { socketid_map } = require("../constants");
const updateState = require("../utils/update-state");

module.exports = (socket) => (reason) => {
  log(
    `room ${socketid_map[socket.id]} disconnected with reason: ${reason}`,
    "info",
    {
      timestampFormat: "DD/mm/yyyy hh:mm:ss a",
    }
  );
  updateState("disconnect", { room: socketid_map[socket.id] });
};
