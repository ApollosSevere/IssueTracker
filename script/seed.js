"use strict";

const {
  db,
  models: { User, Role, Project, Assignment, Issue, Chore },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    Role.create({ name: "Admin", role_desc: "Controls Everything" }),
    Role.create({
      name: "Project Manager",
      role_desc: "Manages Users on Projects",
    }),
    Role.create({ name: "Developer", role_desc: "Writes Code" }),
    Role.create({ name: "Submitter", role_desc: "Complainer" }),

    User.create({
      username: "cody",
      password: "123",
      email: "safadsapollos@gmail.com",
    }),
    User.create({
      username: "Apollos",
      password: "123",
      roleName: "Admin",
      email: "severeapollos@gmail.com",
    }),
    User.create({
      username: "Alexandria",
      password: "123",
      email: "sdfallos@gmail.com",
    }),
    User.create({
      username: "Haddassah",
      password: "123",
      email: "dadfad@gmail.com",
    }),
    User.create({
      username: "Chuck",
      password: "123",
      email: "sdsadsdlos@gmail.com",
    }),
    User.create({
      username: "Melani",
      password: "123",
      email: "sedjaksldjas@gmail.com",
    }),
    User.create({ username: "Bob", password: "123", email: "sevffjadal.com" }),
    Project.create({
      name: "Blog Assignment",
      project_desc:
        "This is a platform where users can share their brilliant ideas!",
      start_date: new Date(),
      target_end_date: new Date(),
    }),
    Project.create({
      name: "Fresh",
      project_desc: "Food/Pantry management system!",
      start_date: new Date(),
      target_end_date: new Date(),
    }),
  ]);

  // await Assignment.create({ userId: 1, projectName: "Blog Assignment" }),
  await Assignment.create({
    userUsername: "Apollos",
    projectName: "Blog Assignment",
  }),
    await Assignment.create({
      userUsername: "Apollos",
      projectName: "Fresh",
    }),
    await Assignment.create({
      userUsername: "Alexandria",
      projectName: "Fresh",
    }),
    await Assignment.create({
      userUsername: "Bob",
      projectName: "Blog Assignment",
    }),
    await Assignment.create({ userUsername: "Chuck", projectName: "Fresh" }),
    await Assignment.create({
      userUsername: "Melani",
      projectName: "Blog Assignment",
    }),
    await Assignment.create({
      userUsername: "Haddassah",
      projectName: "Fresh",
    }),
    // const assignments = users.map(async (user) => {
    //   await Assignment.create({
    //     userId: user.id,
    //     projectId: "Blog Assignment",
    //   });
    // });

    // Creating Issues
    // await Issue.create({
    //   issue_summary: "Testing Issue...",
    //   userUsername: "Bob",
    //   projectName: "Fresh",
    // }); // <-- This should not be able to work! *Find a way to check for this: Bob is not assigned to project Fresh, therefore he cannot make an issue

    await Issue.create({
      issue_summary: "Testing Issue...",
      submitter_username: "Bob",
      projectName: "Blog Assignment",
    });

  await Issue.create({
    issue_summary: "Header link not working",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
  });

  await Issue.create({
    issue_summary: "We need more juice",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
  });

  await Issue.create({
    issue_summary: "I have to go to jazz class",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
  });

  await Issue.create({
    issue_summary: "What is 2 + 4?",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
  });

  await Issue.create({
    issue_summary: "Details button not working",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
  });

  await Chore.create({
    start_date: new Date(),
    assigned_user: "Bob",
    issueId: 1,
  });

  await Chore.create({
    start_date: new Date(),
    assigned_user: "Melani",
    issueId: 2,
  });

  await Chore.create({
    start_date: new Date(),
    assigned_user: "Melani",
    issueId: 1,
  });

  await Chore.create({
    start_date: new Date(),
    assigned_user: "Alexandria",
    issueId: 3,
    projectName: "Blog Assignment",
  });

  await Chore.create({
    start_date: new Date(),
    assigned_user: "Melani",
    issueId: 4,
  });

  await Chore.create({
    start_date: new Date(),
    assigned_user: "Bob",
    issueId: 5,
  });

  await Chore.create({
    start_date: new Date(),
    assigned_user: "Apollos",
    issueId: 1,
  });
  await Chore.create({
    start_date: new Date(),
    assigned_user: "Apollos",
    issueId: 6,
  });

  console.log(`seeded ${users.length} things`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
