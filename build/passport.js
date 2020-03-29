"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _passportGoogleOauth = _interopRequireDefault(require("passport-google-oauth20"));

var _routes = _interopRequireDefault(require("./routes"));

var _User = _interopRequireDefault(require("./models/User"));

var _userController = require("./controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  callbackURL: "https://limitless-beyond-87314.herokuapp.com".concat(_routes["default"].githubCallback)
}, _userController.githubLoginCallback));

_passport["default"].use(new _passportGoogleOauth["default"]({
  clientID: process.env.GG_ID,
  clientSecret: process.env.GG_SECRET,
  callbackURL: "https://limitless-beyond-87314.herokuapp.com".concat(_routes["default"].googleCallback)
}, _userController.googleLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());