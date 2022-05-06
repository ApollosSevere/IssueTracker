import React from "react";

import { Card } from "reactstrap";

export default function About() {
  return (
    <Card>
      <div class="container body-content">
        <h2>About Bug Tracker</h2>
        <div>
          <hr />
          <p>
            Bug Tracker is an application to track errors in software. It was
            created by Apollos Severe.
          </p>
          <p>
            Bug Tracker uses a ticketing system to record bugs or other issues
            in the software development process on a per-project basis. It
            implements user- and role-level security to ensure only authorized
            users can access tickets and projects.
          </p>
          <p>
            The application was built using Node.js and React with an
            PostgresSQL database.
          </p>
          <p>
            <b>Roles:</b> Bug Tracker has four roles that users can be assigned
            to. And one Master role that gives access to all the applications
            features. A user can be in one role at one time. Users are
            automatically placed in a Submitter role upon registration.
          </p>
          <p>Below are brief descriptions of the permissions of each role:</p>
          <p>
            <b>Submitter</b>
          </p>
          <ul>
            <li>Create new tickets for assigned projects</li>
            <li>View and edit tickets they have submitted</li>
          </ul>
          <p>
            <b>Developer</b>
          </p>
          <ul>
            <li>View and edit tickets they have been assigned</li>
            <li>
              Granted access to Developers Kanban page to keep track of assigned
              assignments
            </li>
          </ul>
          <p>
            <b>Project Manager</b>
          </p>
          <ul>
            <li>View and edit tickets for projects they are assigned to</li>
            <li>Assign a developer to a ticket</li>
          </ul>
          <p>
            <b>Admin</b>
          </p>
          <ul>
            <li>Assign users to roles</li>
            <li>View and edit all tickets</li>
            <li>Create new projects</li>
            <li>Assign users to projects</li>
            <li>Remove projects</li>
          </ul>
          <p>
            For each role, users can add comments to tickets they have access
            to.
          </p>

          <p>
            <b>Ticket priorities:</b> A ticket can be Critical, High, Medium or
            Low priority.
          </p>
          <p>
            <b>Ticket statuses:</b> A ticket can be in one of five statuses:
          </p>
          <ul>
            <li>
              <b>Open:</b> Ticket automatically assigned this status on creation
            </li>
            <li>
              <b>In Progress:</b> Ticket automatically changed to this status
              when it is assigned to a developer
            </li>
            <li>
              <b>Additional Info Required:</b> Ticket is waiting on a response
              from a third-party source
            </li>

            <li>
              <b>Resolved:</b> The issue raised in the ticket has been resolved
            </li>
          </ul>
          <p>
            <b>Ticket types:</b> A ticket can be of type Error report, Bug,
            Service request, Feature request or Other.
          </p>

          <h2>FAQs</h2>
          <p>
            <b>How do I submit a new ticket?</b>
          </p>
          <p>
            Make sure you are assigned the Submitter role and have been assigned
            to the project. If not, contact your Admin. Navigate to your Tickets
            page and click on the Create New link to fill out the ticket details
            and submit the ticket.
          </p>
          <p>
            <b>When are notifications sent out?</b>
          </p>
          <p>
            Email notifications are sent to developers on the following events:
          </p>
          <ul>
            <li>Developer assigned to ticket</li>
            <li>Ticket reassigned to another developer</li>
            <li>User other than the developer edits ticket</li>
            <li>User other than developer adds a comment or attachment</li>
          </ul>
          <p>
            <b>Can I change my user info?</b>
          </p>
          <p>Yes, a user can edit their information on the profile page</p>
          <p>
            <b>How can I get my role changed?</b>
          </p>
          <p>Contact your Admin to change your role.</p>
        </div>
        <hr />
        <footer></footer>
      </div>
    </Card>
  );
}
