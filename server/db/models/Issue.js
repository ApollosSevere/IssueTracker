const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("issue", {
  title: {
    type: Sequelize.STRING,
  },
  issue_summary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  issue_description: {
    type: Sequelize.TEXT,
  },
  target_start_date: {
    type: Sequelize.DATE,
  },
  target_end_date: {
    type: Sequelize.DATE,
  },
  actual_start_date: {
    type: Sequelize.DATE,
  },
  actual_resolution_date: {
    type: Sequelize.DATE,
  },
  resolution_summary: {
    type: Sequelize.TEXT,
  },
  time_estimate: {
    type: Sequelize.FLOAT,
  },
  pm_notes: { type: Sequelize.TEXT },
  tags: {
    type: Sequelize.ENUM,
    values: ["Frontend", "Backend", "Customer"],
  },
  type: {
    type: Sequelize.ENUM,
    values: ["Bug", "Error", "Feature Request", "Service Request", "Other"],
  },
  priority: {
    type: Sequelize.ENUM,
    values: ["Low", "Medium", "High", "Immediate", "Unassigned"],
    defaultValue: "Unassigned",
  },
  status: {
    type: Sequelize.ENUM,
    values: [
      "Open",
      "Resolved",
      "In Progress",
      "Additional Info Required",
      "Overdue",
      "Unassigned",
    ],
  },
});
