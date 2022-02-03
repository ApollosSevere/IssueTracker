//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Role = require("./models/Role");
const Issue = require("./models/Issue");
const Chore = require("./models/Chore");
const Assignment = require("./models/Assignment");
const History = require("./models/History");
const Project = require("./models/Project");
const Comment = require("./models/Comment");

// *** Associations could go here! ***//
User.belongsToMany(Project, { through: Assignment });
Project.belongsToMany(User, { through: Assignment });

// All the issues currently assigned to any particular user!!
User.belongsToMany(Issue, {
  as: "current_tasks",
  through: Chore,
  foreignKey: "assigned_user",
});
// This is for the link between the assigned developers to tickets
Issue.belongsToMany(User, {
  as: "assigned_users",
  through: Chore,
});

// This is for the link between the submitter and issue
User.hasMany(Issue, {
  foreignKey: "submitter_username",
});
Issue.belongsTo(User, {
  foreignKey: "submitter_username",
});

Project.hasMany(Issue);
Issue.belongsTo(Project);

User.hasMany(Comment, {
  foreignKey: "commenter_username",
});
Comment.belongsTo(User, {
  foreignKey: "commenter_username",
});

Issue.hasMany(Comment);
Comment.belongsTo(Issue);

Project.hasMany(Comment);
Comment.belongsTo(Project);

Role.hasMany(User);
User.belongsTo(Role, {
  foreignKey: {
    allowNull: true,
    defaultValue: "Submitter",
  },
});

module.exports = {
  db,
  models: {
    User,
    Role,
    Chore,
    History,
    Project,
    Issue,
    Comment,
    Assignment,
  },
};
