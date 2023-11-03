const path = require("path");

exports.PORT = process.env.PORT || 3000;

exports.SOCKETIO_CONFIG_PATH = path.join(__dirname, "socketio.config.js");

exports.TOKEN_VERIFICATION_WEB_HOOK = process.env.TOKEN_VERIFICATION_WEB_HOOK;

exports.SOCKETIO_NAMESPACE = process.env.SOCKETIO_NAMESPACE;

exports.INSTANTIO_WEB_HOOK = process.env.INSTANTIO_WEB_HOOK;

exports.socketid_map = {};
