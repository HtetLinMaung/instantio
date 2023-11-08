const { log } = require("starless-logger");
const { getIO } = require("../utils/socket");
const { eventEmitter } = require("../utils/event");
const { WAIT_TIMEOUT } = require("../constants");

module.exports = async (req, res) => {
  try {
    const { event, payload, rooms } = req.body;
    const wait_client_ack = req.body.wait_client_ack || false;
    log(`Server emitting ${JSON.stringify(req.body)}`, "info", {
      timestampFormat: "DD/mm/yyyy hh:mm:ss a",
    });
    const io = getIO();
    if (!rooms || (Array.isArray(rooms) && !rooms.length)) {
      io.emit(event, payload);
    } else {
      io.to(rooms).emit(event, payload);
    }

    if (wait_client_ack) {
      const timeoutId = setTimeout(() => {
        eventEmitter.removeListener(event);
        res.status(408).json({
          code: 408,
          message: "Timeout waiting!",
        });
      }, WAIT_TIMEOUT);
      eventEmitter.once(event, () => {
        clearTimeout(timeoutId);
        res.json({
          code: 200,
          message: "Event delivered successfully",
        });
      });
    } else {
      res.json({
        code: 200,
        message: "Event emitted successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};
