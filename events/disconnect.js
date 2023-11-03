const { socketid_map } = require("../constants");
const updateState = require("../utils/update-state");

module.exports = (socket) => (reason) => {
  console.log(reason);
  updateState("disconnect", { room: socketid_map[socket.id] });
};
