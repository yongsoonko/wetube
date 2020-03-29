"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _videoController = require("../controllers/videoController");

var _userController = require("../controllers/userController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get(_routes["default"].home, _videoController.home);
globalRouter.get(_routes["default"].search, _videoController.search);
globalRouter.get(_routes["default"].join, _middlewares.onlyPublic, _userController.getJoin);
globalRouter.post(_routes["default"].join, _middlewares.onlyPublic, _userController.postJoin, (0, _userController.postLogin)("local"));
globalRouter.get(_routes["default"].login, _middlewares.onlyPublic, _userController.getLogin);
globalRouter.post(_routes["default"].login, _middlewares.onlyPublic, (0, _userController.postLogin)("local"));
globalRouter.get(_routes["default"].logout, _middlewares.onlyPrivate, _userController.logout);
globalRouter.get(_routes["default"].github, _userController.githubLogin);
globalRouter.get(_routes["default"].githubCallback, (0, _userController.postLogin)("github"));
globalRouter.get(_routes["default"].google, _userController.googleLogin);
globalRouter.get(_routes["default"].googleCallback, (0, _userController.postLogin)("google"));
globalRouter.get(_routes["default"].me, _userController.getMyDetail);
var _default = globalRouter;
exports["default"] = _default;