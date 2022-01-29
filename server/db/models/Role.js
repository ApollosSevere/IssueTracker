const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("role", {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  role_desc: {
    type: Sequelize.STRING,
  },
});
