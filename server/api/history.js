const {
  models: { Chore, Issue, User, Notification, History },
} = require("../db");

const router = require("express").Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const history = await History.findAll();
//     res.status(200).json(history);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { usersToNotify, updateObj } = req.body;
//     // await History.create(req.body);
//     // console.log(req.body);
//     if (usersToNotify.length > 0) {
//       usersToNotify.map(async (user) => {
//         try {
//           await History.create({ ...updateObj, userUsername: user });
//         } catch (error) {
//           console.log(error);
//         }
//       });
//     }
//     const loggedInUser = await User.findByToken(req.headers.authorization);
//     const history = await History.findAll({
//       where: { userUsername: loggedInUser.username },
//       order: [["createdAt", "DESC"]],
//     });

//     res.status(200).json(history);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/:ticketId", async (req, res, next) => {
  try {
    const ticketId = req.params.ticketId;

    const result = await History.findAll({
      where: { issueId: ticketId },
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
