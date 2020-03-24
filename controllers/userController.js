import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (e) {
      console.log(e);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = strategy =>
  passport.authenticate(strategy, {
    failureRedirect: routes.login,
    successRedirect: routes.home
  });

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
  // eslint-disable-next-line consistent-return
) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (e) {
    console.log(e);
    cb(e);
  }
};

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"]
});

export const googleLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
  // eslint-disable-next-line consistent-return
) => {
  const {
    _json: { sub: id, picture: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      googleId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (e) {
    console.log(e);
    cb(e);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (e) {
    console.log(e);
    res.redirect(routes.home);
  }
};

export const getMyDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (e) {
    console.log(e);
    res.redirect(routes.me);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(401);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword1);
    res.redirect(routes.me);
  } catch (e) {
    console.log(e);
    res.status(401);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
