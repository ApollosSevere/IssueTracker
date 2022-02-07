const Sequelize = require("sequelize");
const db = require("../db");

const Chore = db.define("chore", {
  notes: {
    type: Sequelize.TEXT,
  },
});

const validateAssignment = async (chore) => {
  //Check if a user belongs to project before assigning an issue on project
  // if (user.changed("password")) {
  //   user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  // }
};

Chore.beforeCreate(validateAssignment);
Chore.beforeUpdate(validateAssignment);

module.exports = Chore;
