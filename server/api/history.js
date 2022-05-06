const {
  models: { Chore, Issue, User, Notification, History },
} = require("../db");

const router = require("express").Router();

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
