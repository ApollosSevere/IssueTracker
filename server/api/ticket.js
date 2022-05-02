const {
  models: { Issue, User, Comment, Chore, History, Project },
} = require("../db");

const router = require("express").Router();
const {
  requireToken,
  canAccess,
  isDeveloper,
  isProjectManager,
} = require("./middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const issues = await Issue.findAll({ include: { model: User } });

    res.status(200).json(issues);
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
    const ticket = await Issue.create(req.body);

    const project = await Project.findByPk(ticket.projectName);

    await History.create({
      title: `Ticket Created`,
      summary: `New ticket: ${req.body.issue_summary} created from project 
      ${req.body.projectName} - Project Description: 
      ${project.project_desc}`,
      issueId: ticket.id,
    });
    res.status(200).json(ticket);
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

// Developer or  Master Only Route
router.put(
  "/owner/:issueId",
  requireToken,
  isDeveloper,
  async (req, res, next) => {
    try {
      const issue = await Issue.findByPk(req.params.issueId);

      if (issue.status !== req.body.status) {
        const updatedIssue = await issue.update(req.body);

        if (req.body.status === "In Progress") {
          await History.create({
            title: `Ticket Status change: In Progress`,
            summary: `Developers are currently addressing Ticket: "${issue.issue_summary}"`,
            issueId: issue.id,
          });
        }

        if (req.body.status === "Resolved") {
          await History.create({
            title: `Ticket Resolved`,
            summary: `Developers have finished addressing Ticket: "${issue.issue_summary}"`,
            issueId: issue.id,
          });
        }
      }

      await History.create({
        title: `Ticket #${issue.id} updated`,
        summary: `Ticket #${issue.id} updated by: "${issue.submitter_username}"`,
        issueId: issue.id,
        projectName: issue.projectName,
      });
      await issue.update(req.body);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

// Project Manager or Master Only Route
router.put(
  "/manager/:issueId",
  requireToken,
  isProjectManager,
  async (req, res, next) => {
    try {
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
        try {
          const updatedChores = usersToAdd.map(
            async (user) =>
              await Chore.create({
                notes,
                assigned_user: user,
                issueId,
                projectName,
              })
          );

          await History.create({
            title: `Ticket Assigned to Developers`,
            summary: `Ticket assigned to ${usersToAdd.join(", ")}`,
            issueId: issueId,
          });
        } catch (error) {
          console.log(error);
        }
      }

      if (usersToRemove.length > 0) {
        try {
          const updatedChores = usersToRemove.map(async (user) => {
            const chore = await Chore.findAll({
              where: { assigned_user: user, issueId },
            });
            await chore[0].destroy();

            await History.create({
              title: `Ticket Assignment`,
              summary: `Developers removed from assignment: ${usersToRemove.join(
                ", "
              )}`,
              issueId: issueId,
            });
          });
        } catch (error) {
          console.log(error);
        }
      }

      console.log(req.body);

      const issue = await Issue.findByPk(issueId);

      const updatedIssue = await issue.update({
        target_start_date: startDate,
        target_end_date: endDate,
        time_estimate: timeEstimate,
        priority,
        status: "Open",
        pm_notes: notes,
      });

      res.json(updatedIssue);
    } catch (error) {
      next(error);
    }
  }
);

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

router.get("/myTickets/:userId", async (req, res, next) => {
  try {
    const submitter_username = req.params.userId;
    const result = await Issue.findAll({ where: { submitter_username } });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:issueId",
  requireToken,
  isProjectManager,
  async (req, res, next) => {
    try {
      const id = req.params.issueId;
      const post = await Issue.findByPk(id);
      await post.destroy();
      res.send(200).json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/comment/:commentId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.commentId;
    const post = await Comment.findByPk(id);
    const issueId = post.issueId;

    await post.destroy();

    const result = await Issue.findByPk(issueId, {
      include: [{ model: User, as: "assigned_users" }, { model: Comment }],
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
