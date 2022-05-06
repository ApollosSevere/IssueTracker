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
    Role.create({
      name: "Master",
      role_desc: "Has Access to all features of application",
    }),

    User.create({
      username: "cody",
      password: "123",
      email: "safadsapollos@gmail.com",
      phone_number: 2677284756,
      // roleName: "Master",
      roleName: "Submitter",
      // roleName: "Project Manager",
      // roleName: "Developer",
      // roleName: "Admin",
      image_location: "../../assets/img/theme/team-3-800x800.jpg",
    }),
    User.create({
      username: "Apollos",
      password: "123",
      roleName: "Master",
      // roleName: "Submitter",
      // roleName: "Project Manager",
      // roleName: "Developer",
      // roleName: "Admin",
      email: "severeapollos@gmail.com",
      phone_number: 2672837463,
      image_location: "../../assets/img/theme/apollo_headshot.jpeg",
    }),
    User.create({
      username: "Megan",
      password: "123",
      email: "sdfallos@gmail.com",
      // roleName: "Master",
      // roleName: "Submitter",
      roleName: "Project Manager",
      // roleName: "Developer",
      // roleName: "Admin",
      phone_number: 2677567294,
      image_location: "../../assets/img/theme/team-4-800x800.jpg",
    }),
    User.create({
      username: "Haddassah",
      password: "123",
      email: "dadfad@gmail.com",
      phone_number: 2673057562,
      // roleName: "Master",
      // roleName: "Submitter",
      // roleName: "Project Manager",
      roleName: "Developer",
      // roleName: "Admin",
      image_location: "../../assets/img/theme/team-2-800x800.jpg",
    }),
    User.create({
      username: "Chuck",
      password: "123",
      email: "sdsadsdlos@gmail.com",
      // roleName: "Master",
      // roleName: "Submitter",
      // roleName: "Project Manager",
      roleName: "Developer",
      // roleName: "Admin",
      phone_number: 26792834636,
      image_location: "../../assets/img/theme/userPhoto.png",
    }),
    User.create({
      username: "Melani",
      password: "123",
      email: "sedjaksldjas@gmail.com",
      phone_number: 2679573637,
      // roleName: "Master",
      roleName: "Submitter",
      // roleName: "Project Manager",
      // roleName: "Developer",
      // roleName: "Admin",
      image_location: "../../assets/img/theme/team-1-800x800.jpg",
    }),
    User.create({
      username: "Bob",
      password: "123",
      email: "sevffjadal.com",
      phone_number: 2679876534,
      roleName: "Developer",
      image_location: "../../assets/img/theme/userPhoto.png",
    }),

    // For Live Demo Purposes:
    User.create({
      username: "Master (Demo)",
      password: "123",
      email: "master@gmail.com",
      phone_number: 2673057562,
      roleName: "Master",
      image_location: "../../assets/img/theme/masterPhoto.png",
    }),
    User.create({
      username: "Admin (Demo)",
      password: "123",
      email: "Admin@gmail.com",
      phone_number: 2673057562,
      roleName: "Admin",
      image_location: "../../assets/img/theme/adminPhoto.jpeg",
    }),
    User.create({
      username: "Project Manager (Demo)",
      password: "123",
      email: "project_managerr@gmail.com",
      phone_number: 2673057562,
      roleName: "Project Manager",
      image_location: "../../assets/img/theme/managerPhoto.png",
    }),
    User.create({
      username: "Developer (Demo)",
      password: "123",
      email: "developer@gmail.com",
      phone_number: 2673057562,
      roleName: "Developer",
      image_location: "../../assets/img/theme/developerPhoto.png",
    }),
    User.create({
      username: "Submitter (Demo)",
      password: "123",
      email: "submitter@gmail.com",
      phone_number: 2673057562,
      roleName: "Submitter",
      image_location: "../../assets/img/theme/submitterPhoto.png",
    }),

    Project.create({
      name: "Blog Assignment",
      project_desc:
        "This is a platform where users can share their brilliant ideas!",
      start_date: new Date(),
      target_end_date: new Date(),
      image_location: "../../assets/img/theme/blogAssignment.jpg",
    }),
    Project.create({
      name: "Fresh",
      project_desc: "Food/Pantry management system!",
      start_date: new Date(),
      target_end_date: new Date(),
      image_location: "../../assets/img/theme/freshLogo.png",
    }),
    Project.create({
      name: "Apollos Electro Store",
      project_desc: "Robust E-commerce Website",
      start_date: new Date(),
      target_end_date: new Date(),
      image_location: "../../assets/img/theme/electroStore.webp",
    }),
    Project.create({
      name: "Bug Tracker",
      project_desc: "Helps Manage Large Applications",
      start_date: new Date(),
      target_end_date: new Date(),
      image_location: "../../favicon.ico",
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
      userUsername: "Megan",
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
      type: "Bug",
      status: "Open",
      submitter_username: "Bob",
      projectName: "Blog Assignment",
      issue_description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
    });

  await Issue.create({
    issue_summary: "Header link not working",
    type: "Feature Request",
    status: "Resolved",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
    issue_description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
  });

  await Issue.create({
    issue_summary: "We need more juice",
    type: "Service Request",
    status: "Resolved",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
    issue_description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
  });

  await Issue.create({
    issue_summary: "I have to go to jazz class",
    status: "Open",
    priority: "High",
    type: "Other",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
    issue_description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
  });

  await Issue.create({
    issue_summary: "What is 2 + 4?",
    status: "Resolved",
    type: "Error",
    submitter_username: "Apollos",
    projectName: "Blog Assignment",
    issue_description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
  });

  await Issue.create({
    issue_summary: "Details button not working",
    submitter_username: "Apollos",
    type: "Feature Request",
    status: "Resolved",
    projectName: "Blog Assignment",
    issue_description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum ",
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
    assigned_user: "Megan",
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
    notes:
      "The first thing I need you to do is get what you need from the store then come back with the stuff that you need to get in the other place, and yeah yeah yeah then I need you to go to the place to grab what you need",
  });
  await Chore.create({
    start_date: new Date(),
    assigned_user: "Apollos",
    issueId: 6,
    notes: "I need you to make the blah blah yo yo pronto",
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
