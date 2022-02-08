const {
  models: { Issue, User, Comment, Chore },
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

router.get("/attributes", requireToken, async (req, res, next) => {
  try {
    const fliedAttributes = {
      type: await Issue.rawAttributes.type.values,
      priority: await Issue.rawAttributes.priority.values,
    };

    res.status(200).json(fliedAttributes);
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

router.put("/owner/:issueId", requireToken, async (req, res, next) => {
  try {
    const post = await Issue.findByPk(req.params.issueId);
    const updatedIssue = await post.update(req.body);
    res.json(updatedIssue);
  } catch (error) {
    next(error);
  }
});

router.put("/manager/:issueId", requireToken, async (req, res, next) => {
  try {
    // const issue = await Issue.findByPk(req.params.issueId);
    // const updatedIssue = await issue.update(req.body);

    const {
      notes,
      usersToAdd,
      issueId,
      usersToRemove,
      startDate,
      endDate,
      priority,
      projectName,
      timeEstimate,
    } = req.body;

    if (usersToAdd.length > 0) {
      const updatedChores = usersToAdd.map(
        async (user) =>
          await Chore.create({
            notes,
            assigned_user: user,
            issueId,
            projectName,
          })
      );
    }

    if (usersToRemove.length > 0) {
      const updatedChores = usersToRemove.map(async (user) => {
        const chore = await Chore.findAll({ where: { issueId } });
        await chore[0].destroy();
      });
    }

    console.log(req.body);

    // await Chore.create(req.body.choreInfo);

    const issue = await Issue.findByPk(issueId);

    const updatedIssue = await issue.update({
      target_start_date: startDate,
      target_end_date: endDate,
      time_estimate: timeEstimate,
      priority,
      status: "Open",
    });

    // await Notification.create(req.body) Make this later!
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
