import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (e) {
    console.log(e);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    // videos = await Video.find().regex("title", new RegExp(searchingBy, "i"));
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (e) {
    console.log(e);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description,
      creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (e) {
    console.log(e);
  }
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const postAddComment = async (req, res) => {
  const {
    body: { comment },
    params: { id },
    user
  } = req;
  try {
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    const video = await Video.findById(id);
    video.comments.push(newComment._id);
    video.save();
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(400);
  } finally {
    res.end();
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndDelete({ _id: id });
    }
  } catch (e) {
    console.log(e);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (e) {
    console.log(e);
    res.status(400);
  } finally {
    res.end();
  }
};
