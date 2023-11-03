const axios = require("axios");
const { INSTANTIO_WEB_HOOK } = require("../constants");

module.exports = async (event, data = {}) => {
  try {
    if (INSTANTIO_WEB_HOOK) {
      await axios.post(INSTANTIO_WEB_HOOK, {
        event,
        data,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
