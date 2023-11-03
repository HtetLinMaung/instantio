const { getIO } = require("../utils/socket");

module.exports = async (req, res) => {
  try {
    const { event, payload, rooms } = req.body;
    console.log(`Server emitting ${JSON.stringify(req.body)}`);

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
