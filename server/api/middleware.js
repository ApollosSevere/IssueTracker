const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const canAccess = (req, res, next) => {
  const user = req.user;
  if (user.roleName === "Admin" || user.roleName === "Master") {
    next();
  } else {
    return res.status(403).send("Unauthorized access");
  }
};

const isDeveloper = (req, res, next) => {
  const user = req.user;
  if (user.roleName === "Developer" || user.roleName === "Master") {
    next();
  } else {
    return res.status(403).send("Unauthorized access");
  }
};

const isProjectManager = (req, res, next) => {
  const user = req.user;
  if (user.roleName === "Project Manager" || user.roleName === "Master") {
    next();
  } else {
    return res.status(403).send("Unauthorized access");
  }
};

module.exports = {
  requireToken,
  canAccess,
  isDeveloper,
  isProjectManager,
};
