//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const History = require("./models/History");
const Role = require("./models/Role");
const Project = require("./models/Project");
const Issue = require("./models/Issue");
const Comment = require("./models/Comment");

// *** Associations could go here! ***//
User.belongsToMany(Project, { through: "assignment" });
Project.belongsToMany(User, { through: "assignment" });

User.belongsToMany(Issue, { through: "chore" });
Issue.belongsToMany(User, { through: "chore" });

User.hasMany(Issue);
Issue.belongsTo(User, { as: "submitter" });

Project.hasMany(Issue);
Issue.belongsTo(Project);

User.hasMany(Comment);
Comment.belongsTo(User);

Issue.hasMany(Comment);
Comment.belongsTo(Issue);

Project.hasMany(Comment);
Comment.belongsTo(Project);

Role.hasMany(User);
User.belongsTo(Role, {
  foreignKey: {
    allowNull: false,
    defaultValue: "Submitter",
  },
});

module.exports = {
  db,
  models: {
    User,
    Role,
    History,
    Project,
    Issue,
    Comment,
  },
};
