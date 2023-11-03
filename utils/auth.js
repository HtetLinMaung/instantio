const axios = require("axios");
const { TOKEN_VERIFICATION_WEB_HOOK } = require("../constants");

exports.isTokenValid = async (token) => {
  try {
    const res = await axios.post(`${TOKEN_VERIFICATION_WEB_HOOK}`, { token });
    console.log(
      `TOKEN_VERIFICATION_WEB_HOOK response: ${JSON.stringify(res.data)}`
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
