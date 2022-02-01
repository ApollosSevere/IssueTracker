const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define("assignment", {
  term_end_date: {
    type: Sequelize.DATE,
  },
});
