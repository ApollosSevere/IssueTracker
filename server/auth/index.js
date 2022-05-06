const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const users = await User.findAll();

    const getImage = () => {
      const userPhotos = users.map((user) => user.image);

      const generatePhoto = () =>
        `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * (99 - 1) + 1
        )}.jpg`;

      const potentialImgUrl = generatePhoto();
      let timesRan = 0;

      while (userPhotos.includes(potentialImgUrl) && timesRan <= 100) {
        potentialImgUrl = generatePhoto();
        timesRan++;
      }

      return timesRan <= 99
        ? potentialImgUrl
        : "../../assets/img/theme/userPhoto.png";
    };

    const user = await User.create({
      ...req.body,
      image: getImage(),
    });

    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("Username already taken");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const updatedUser = await user.update(req.body);

    res.status(200).json(updatedUser);
  } catch (ex) {
    next(ex);
  }
});
