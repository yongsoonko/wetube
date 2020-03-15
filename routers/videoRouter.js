import express from "express";
import routes from "../routes";
import {
  home,
  search,
  videoDetail,
  deleteVideo,
  postUpload,
  getUpload,
  getEditVideo,
  postEditVideo
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// home
videoRouter.get(routes.home, home);

// video search
videoRouter.get(routes.search, search);

// video upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// video edit
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// video delete
videoRouter.get(routes.deleteVideo(), deleteVideo);

// video detail
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
