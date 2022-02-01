const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("chore", {
  details: {
    type: Sequelize.TEXT,
  },
});
