const path = require("path");

exports.PORT = process.env.PORT || 3000;

exports.SOCKETIO_CONFIG_PATH = path.join(__dirname, "socketio.config.js");

exports.TOKEN_VERIFICATION_WEB_HOOK = process.env.TOKEN_VERIFICATION_WEB_HOOK;

exports.SOCKETIO_NAMESPACES = (process.env.SOCKETIO_NAMESPACES || "")
  .trim()
  .split(",")
  .map((namespace) => namespace.trim())
  .filter((namespace) => namespace);

exports.INSTANTIO_WEB_HOOK = process.env.INSTANTIO_WEB_HOOK;

exports.WAIT_TIMEOUT = parseInt(process.env.WAIT_TIMEOUT || `${30 * 1000}`);

exports.socketid_map = {};
