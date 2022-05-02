const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("project", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  project_desc: {
    type: Sequelize.TEXT,
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
  image: {
    type: Sequelize.STRING,
  },
  image_location: {
    type: Sequelize.STRING,
  },
});
