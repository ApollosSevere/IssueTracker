const router = require("express").Router();
const {
  models: { User, Role, Assignment, Project, Issue, Chore },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/assigned/:projectId", async (req, res, next) => {
  try {
    const project_name = req.params.projectId;

    const projectData = await Project.findOne({
      where: { name: project_name },
      include: [
        {
          model: User,
          // where: { id: userId },
          attributes: [
            "username",
            "first_name",
            "last_name",
            "email",
            "roleName",
          ],
        },

        {
          model: Issue,

          include: [
            {
              model: User,
              as: "assigned_users",
              // attributes: [
              //   "username",
              //   "first_name",
              //   "last_name",
              //   "email",
              //   "roleName",
              // ],
            },
          ],
        },
      ],
    });

    // const userData = await User.findOne({
    //   where: { username: "Apollos" },
    //   include: [{ model: Project }, { model: Issue }],
    // });

    // const allProjectData = await Project.findAll({
    //   // where: { name: project_name },
    //   include: [
    //     {
    //       model: User,
    //       // where: { id: userId },
    //       attributes: [
    //         "username",
    //         "first_name",
    //         "last_name",
    //         "email",
    //         "roleName",
    //       ],
    //       include: [{ model: Issue }],
    //     },
    //     { model: Issue },
    //   ],
    // });

    res.json(projectData);
    // res.json(userData);
  } catch (err) {
    next(err);
  }
});

// const users = await User.findAll({
//   where: {

//   },
//   attributes: ["id", "username", "first_name", "last_name", "email"],
// });
