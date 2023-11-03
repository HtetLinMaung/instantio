const { TOKEN_VERIFICATION_WEB_HOOK, socketid_map } = require("../constants");
const { isTokenValid } = require("../utils/auth");
const updateState = require("../utils/update-state");

module.exports = (socket) => (data) => {
  const { token, room } = data;
  if (TOKEN_VERIFICATION_WEB_HOOK) {
    const valid = isTokenValid(token);
    if (valid) {
      socket.join(valid.room);
      socketid_map[socket.id] = valid.room;
      console.log(`User joined to room ${valid.room}`);
      updateState("join", { room: valid.room });
    } else {
      socket.disconnect();
    }
  } else {
    socket.join(room);
    socketid_map[socket.id] = room;
    console.log(`User joined to room ${room}`);
    updateState("join", { room });
  }
};
