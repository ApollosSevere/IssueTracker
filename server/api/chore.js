const {
  models: { Chore, Issue, User, Comment },
} = require("../db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const chores = await Chore.findAll();

    res.status(200).json(chores);
  } catch (error) {
    next(error);
  }
});

router.post("/addchore", async (req, res, next) => {
  try {
    await Chore.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.put("/:choreId", async (req, res, next) => {
  try {
    const post = await Chore.findByPk(req.params.choreId);
    const updatedChore = await post.update(req.body);
    res.json(updatedChore);
  } catch (error) {
    next(error);
  }
});

router.get("/find/:userId", async (req, res, next) => {
  try {
    const id = req.params.userId;
    const result = await User.findByPk(id, {
      include: {
        model: Issue,
        as: "current_tasks",
        include: [{ model: Comment }, { model: User, as: "assigned_users" }],
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:choreId", async (req, res, next) => {
  try {
    const id = req.params.choreId;
    const result = await Chore.findByPk(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:choreId", async (req, res, next) => {
  try {
    const id = req.params.choreId;
    const post = await Chore.findByPk(id);
    await post.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
