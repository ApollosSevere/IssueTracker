const {
  models: { Chore, Issue, User, Notification },
} = require("../db");

const { requireToken } = require("./middleware");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { usersToNotify, updateObj } = req.body;

    if (usersToNotify.length > 0) {
      usersToNotify.map(async (user) => {
        try {
          await Notification.create({ ...updateObj, userUsername: user });
        } catch (error) {
          console.log(error);
        }
      });
    }
    const loggedInUser = await User.findByToken(req.headers.authorization);
    const notifications = await Notification.findAll({
      where: { userUsername: loggedInUser.username },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userUsername = req.params.userId;
    console.log(userUsername);
    const result = await Notification.findAll({
      where: { userUsername },
      order: [["createdAt", "DESC"]],
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:notificationId", async (req, res, next) => {
  try {
    const notification = await Notification.findByPk(req.params.notificationId);
    await notification.update(req.body);

    const loggedInUser = await User.findByToken(req.headers.authorization);
    const notifications = await Notification.findAll({
      where: { userUsername: loggedInUser.username },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
});

router.delete("/:notificationId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.notificationId;
    const notification = await Notification.findByPk(id);
    await notification.destroy();

    const loggedInUser = await User.findByToken(req.headers.authorization);
    const notifications = await Notification.findAll({
      where: { userUsername: loggedInUser.username },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
