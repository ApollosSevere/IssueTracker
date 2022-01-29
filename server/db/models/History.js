const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("history", {
  summary: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM,
    values: [
      "Role Change",
      "Role Assignment",
      "Assigned To Developer",
      "Re-assigned To Developer",
      "Project Created",
      "Users Assigned",
      "Assigned Users Updated",
    ],
  },
  Subject: {
    type: Sequelize.ENUM,
    values: ["User", "Issue", "Project"],
  },
});
