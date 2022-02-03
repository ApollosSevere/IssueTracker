const {
  models: { Issue, User, Comment },
} = require("../db");

const router = require("express").Router();
const { requireToken } = require("./middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const issue = await Issue.findAll();
    // await Issue.create(req.body);
    res.status(200).json(issue);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    await Issue.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/addcomment", requireToken, async (req, res, next) => {
  try {
    await Comment.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.put("/:issueId", requireToken, async (req, res, next) => {
  try {
    const post = await Issue.findByPk(req.params.issueId);
    const updatedIssue = await post.update(req.body);
    res.json(updatedIssue);
  } catch (error) {
    next(error);
  }
});

router.get("/:issueId", async (req, res, next) => {
  try {
    const id = req.params.issueId;
    const result = await Issue.findByPk(id, {
      include: [{ model: User, as: "assigned_users" }, { model: Comment }],
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:issueId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.issueId;
    const post = await Issue.findByPk(id);
    await post.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
