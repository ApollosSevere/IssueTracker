# Candidate Blog Assignment

My solution to creating a Blog with two main resources: Post and Tags

Deployed Link: https://blogassingment-apollo.herokuapp.com/

## Assumptions

1. The company would like users to hold separate accounts for posting Blogs
2. Users can only edit or delete their post

## Solution formulation

Steps I executed for implementing main functionality:

1. To display all posts ordered from newest to oldest:

   - In the global object variable `feed`, there are two felids that keeps tract of `allPosts` and `filteredPost`:
   - On the frontend level, the `allPost` variable is sorted then displayed

2. To filter through Tagged Post:

   - On the frontend, the `allPosts` global variable is filtered through a built in sort method. All filtered posts must include a Tag that a user wants to filter through. The result of this is placed in the `filteredPost` global variable.
     The frontend only uses the `filteredPost` variable to display appropriate posts

3. Tags :

   - The `Post` table inside the PostgreSQL database has a flied named `tags` that holds an array of tags that can be associated with the post. This array flied is restricted to having only 3 values.

## Libraries/Tools used

- Written with: `React` version 16.8.6 | `Express`: 4.16.4
  - "axios": "^0.21.1",
  - "bcrypt": "^5.0.0",
  - "compression": "^1.7.3",
  - "express": "^4.16.4",
  - "history": "^4.9.0",
  - "jsonwebtoken": "^8.5.1",
  - "morgan": "^1.9.1",
  - "pg": "^8.5.1",
  - "react-select": "^5.2.1",
  - "sequelize": "^6.3.5",
  - "style-loader": "^3.3.1"

## How to setup

To use this application you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

- Now you will have to add the Blog Assignment as a remote and merge it into your own repository.

```
git remote add BlogAssignment https://github.com/ApollosSevere/BlogAssignment.git
git fetch BlogAssignment
git merge BlogAssignment/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
- These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

- By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev`

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

## Running Tests

- On the main project directory type: `npm run test`

![Code Coverage](https://user-images.githubusercontent.com/55603364/146621421-feca58fa-6256-4a5d-8cc3-c8f4abe6f875.jpeg)

## Decisions

1. The Tech Stack I decide to use was: `React` | `Redux` | `Sequelize` | `Express/Node`
2. For global state management I chose to use Redux
3. I structured the application to resemble a social media blog post site, where users see other peoples post as well as write and edit their own (editing and deleting a post is reserved only for the user who authored it)
4. Deploy application on Heroku
   - I have made the application available on the internet incase if the person reviewing this Candidate Assignment has trouble configuring the application on their local machine
