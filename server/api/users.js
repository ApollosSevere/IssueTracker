const router = require("express").Router();
const {
  models: { User, Role, Assignment, Project, Issue, Chore, Notification },
} = require("../db");
module.exports = router;
const { requireToken, canAccess } = require("./middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "username",
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "address",
        "city",
        "state",
        "country",
        "zipcode",
        "about_me",
        "image",
        "image_location",
      ],
      include: { model: Role },
      order: [["username", "DESC"]],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Admin or Master Only Route
router.put("/:userId", requireToken, canAccess, async (req, res, next) => {
  try {
    const id = req.params.userId;

    const user = await User.findByPk(id);

    await Notification.create({
      summary: `Role change: from ${user.roleName} -> ${req.body.roleName}`,
      subject: "User",
      userUsername: id,
    });

    await user.update(req.body);

    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "username",
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "address",
        "city",
        "state",
        "country",
        "zipcode",
        "about_me",
        "image",
        "image_location",
      ],
      include: { model: Role },
      order: [["username", "DESC"]],
    });
    res.json(users);
  } catch (error) {
    next(error);
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
            "phone_number",
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
