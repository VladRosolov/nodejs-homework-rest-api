const register = require("./register");
const login = require("./login");
const logOut = require("./logOut");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  logOut,
  getCurrent,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
