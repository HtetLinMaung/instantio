const { log } = require("starless-logger");
const { socketid_map } = require("../constants");
const { eventEmitter } = require("../utils/event");

module.exports =
  (socket, namespace) =>
  (event, data = {}) => {
    log(
      `[${namespace}] room ${socketid_map[socket.id]} received event ${event}`,
      "info",
      {
        timestampFormat: "DD/mm/yyyy hh:mm:ss a",
      }
    );
    eventEmitter.emit(event, data);
  };
