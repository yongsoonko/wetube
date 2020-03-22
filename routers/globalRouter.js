import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  logout,
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  githubLogin,
  getMyDetail,
  googleLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin("local"));

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin("local"));

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, postLogin("github"));

globalRouter.get(routes.google, googleLogin);
globalRouter.get(routes.googleCallback, postLogin("google"));

globalRouter.get(routes.me, getMyDetail);

export default globalRouter;
