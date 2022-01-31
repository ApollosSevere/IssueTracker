const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("project", {
  project_name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  target_end_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  actual_end_date: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});
