const axios = require("axios");
const { TOKEN_VERIFICATION_WEB_HOOK } = require("../constants");
const { log } = require("starless-logger");

exports.isTokenValid = async (token) => {
  try {
    const res = await axios.post(`${TOKEN_VERIFICATION_WEB_HOOK}`, { token });
    log(
      `TOKEN_VERIFICATION_WEB_HOOK response: ${JSON.stringify(res.data)}`,
      "info",
      {
        timestampFormat: "DD/mm/yyyy hh:mm:ss a",
      }
    );
    if (res.data.code == 200) {
      return res.data.data.room;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
