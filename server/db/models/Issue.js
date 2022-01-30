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
  tags: {
    type: Sequelize.ENUM,
    values: ["Frontend", "Backend", "Customer"],
  },
  status: {
    type: Sequelize.ENUM,
    values: ["Open", "Resolved", "In Progress", "Additional Info Required"],
  },
  priority: {
    type: Sequelize.ENUM,
    values: ["Low", "Medium", "High", "Immediate"],
  },
  actual_resolution_date: {
    type: Sequelize.DATE,
  },
  resolution_summary: {
    type: Sequelize.TEXT,
  },
});
