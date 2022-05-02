const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/chores", require("./chore"));
router.use("/tickets", require("./ticket"));
router.use("/history", require("./history"));
router.use("/projects", require("./projects"));
router.use("/notifications", require("./notifications"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
