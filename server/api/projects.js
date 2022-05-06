const {
  models: { Project, Issue, User, Assignment, Notification },
} = require("../db");

const router = require("express").Router();
const { requireToken, canAccess } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: User }, { model: Issue }],
      order: [["name", "ASC"]],
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:projectId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const result = await Project.findByPk(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Admin or Master Only Route
router.post("/", requireToken, canAccess, async (req, res, next) => {
  try {
    await Project.create(req.body);

    const projects = await Project.findAll({
      include: [{ model: User }, { model: Issue }],
      order: [["name", "ASC"]],
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

// Admin or Master Only Route
router.post("/:projectId", requireToken, canAccess, async (req, res, next) => {
  try {
    const post = await Project.findByPk(req.params.projectId);
    await post.update(req.body);

    const projects = await Project.findAll({
      include: [{ model: User }, { model: Issue }],
      order: [["name", "ASC"]],
    });

    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

// Admin or Master Only Route
router.delete(
  "/:projectId",
  requireToken,
  canAccess,
  async (req, res, next) => {
    try {
      const id = req.params.projectId;
      const post = await Project.findByPk(id);
      await post.destroy();

      const projects = await Project.findAll({
        include: [{ model: User }, { model: Issue }],
        order: [["name", "ASC"]],
      });

      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }
);

// Admin or Master Only Route
router.put(
  "/manager/:projectId",
  requireToken,
  canAccess,
  async (req, res, next) => {
    try {
      const { usersToAdd, name: projectId, usersToRemove } = req.body;

      let updatedChores;
      let updatedProjectUsers;

      if (usersToAdd.length > 0) {
        updatedProjectUsers = usersToAdd.map(async (user) => {
          try {
            await Assignment.create({
              projectId,
              projectName: projectId,
              userUsername: user,
            });
            await Notification.create({
              summary: `New Project assignment: ${projectId}`,
              subject: "Project",
              userUsername: user,
              projectName: projectId,
            });
          } catch (error) {
            console.log(error);
          }
        });
      }

      if (usersToRemove.length > 0) {
        updatedChores = usersToRemove.map(async (user) => {
          try {
            const assignment = await Assignment.findAll({
              where: { userUsername: user, projectName: projectId },
            });

            await assignment[0].destroy();

            await Notification.create({
              summary: `You were removed from project: ${projectId}`,
              subject: "Project",
              userUsername: user,
              projectName: projectId,
            });
          } catch (error) {
            console.log(error);
          }
        });
      }

      console.log(req.body);

      const projects = await Project.findAll({
        include: User,
        order: [["name", "ASC"]],
      });

      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
