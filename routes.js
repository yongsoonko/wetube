// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const ME = "/me";

// USER
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// VIDEOS
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Google
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

// API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id => {
    if (id) return `/users/${id}`;
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) return `/videos/${id}`;
    return VIDEO_DETAIL;
  },
  editVideo: id => {
    if (id) return `/videos/${id}/edit`;
    return EDIT_VIDEO;
  },
  deleteVideo: id => {
    if (id) return `/videos/${id}/delete`;
    return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
  me: ME,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT
};

export default routes;
