const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("issue", {
  issue_summary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  issue_description: {
    type: Sequelize.STRING,
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
  //   status: {
  //     type: Sequelize.ENUM,
  //   },
  //   priority: {},
  //   actual_resolution_date: {},
  //   resolution_summary: {},

  //   Make Comments Table!!
});
