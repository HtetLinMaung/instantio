const { log } = require("starless-logger");
const { getIO } = require("../utils/socket");

module.exports = async (req, res) => {
  try {
    const { event, payload, rooms } = req.body;
    log(`Server emitting ${JSON.stringify(req.body)}`, "info", {
      timestampFormat: "DD/mm/yyyy hh:mm:ss a",
    });
    const io = getIO();
    if (!rooms || (Array.isArray(rooms) && !rooms.length)) {
      io.emit(event, payload);
    } else {
      io.to(rooms).emit(event, payload);
    }

    res.json({
      code: 200,
      message: "Event emitted successfully",
    });
  } catch (err) {
    console.error(err);
    res.json({
      code: 500,
      message: err.message,
    });
  }
};
