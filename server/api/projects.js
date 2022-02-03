const {
  models: { Project, Issue },
} = require("../db");

const router = require("express").Router();
const { requireToken } = require("./middleware");

router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    // await Project.create(req.body);
    const typeValues = Issue.rawAttributes.type.values;
    res.status(200).json({ projects: [...projects], typeValues });
  } catch (error) {
    next(error);
  }
});

router.post("/addproject", requireToken, async (req, res, next) => {
  try {
    await Project.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.put("/:projectId", requireToken, async (req, res, next) => {
  try {
    const post = await Project.findByPk(req.params.projectId);
    const updatedProject = await post.update(req.body);
    res.json(updatedProject);
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
    // res.status(401).send("User already exists");
  }
});

router.delete("/:projectId", requireToken, async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const post = await Project.findByPk(id);
    await post.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
