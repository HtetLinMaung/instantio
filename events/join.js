const { log } = require("starless-logger");
const { TOKEN_VERIFICATION_WEB_HOOK, socketid_map } = require("../constants");
const { isTokenValid } = require("../utils/auth");
const updateState = require("../utils/update-state");

module.exports = (socket, namespace) => async (data) => {
  const { token, room } = data;
  if (TOKEN_VERIFICATION_WEB_HOOK) {
    const room = await isTokenValid(token);
    if (room) {
      socket.join(room);
      socketid_map[socket.id] = room;
      log(`[${namespace}] User joined to room ${room}`, "info", {
        timestampFormat: "DD/mm/yyyy hh:mm:ss a",
      });
      updateState("join", { room });
    } else {
      socket.disconnect();
    }
  } else {
    socket.join(room);
    socketid_map[socket.id] = room;
    log(`[${namespace}] User joined to room ${room}`, "info", {
      timestampFormat: "DD/mm/yyyy hh:mm:ss a",
    });
    updateState("join", { room });
  }
};
