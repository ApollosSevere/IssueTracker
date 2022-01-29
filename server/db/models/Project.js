const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("project", {
  project_name: {
    type: Sequelize.STRING,
    unique: true,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  target_end_date: {
    type: Sequelize.DATE,
  },
  actual_end_date: {
    type: Sequelize.DATE,
  },
});
