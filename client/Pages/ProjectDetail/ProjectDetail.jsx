import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchProjectUsers } from "../../store/users";

const RowItem = ({ user }) => {
  return (
    <tr>
      <td>
        <p className="username">{user.username}</p>
      </td>
      <td>
        <p className="roleName">{user.roleName}</p>
      </td>
      <td>
        <p className="email">{user.email}</p>
      </td>
    </tr>
  );
};

const RowItemIssue = ({ issue }) => {
  return (
    <tr>
      <td>
        <Link to={`/ticketDetail/${issue.id}`}>
          <p className="username">{issue.issue_summary}</p>
        </Link>
      </td>
      <td>
        <p className="roleName">{issue.createdAt}</p>
      </td>
      <td>
        <p className="email">
          | {issue.assigned_users.map((v) => v.username).join(", ")} |
        </p>
      </td>
    </tr>
  );
};

export const ProjectDetail = ({ projectData, getProjectUsers, userId }) => {
  const { projectId } = useParams();
  const info = projectData ? projectData : "Loading ..";

  const sortIssue = (array) =>
    array.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const rowData =
    Object.keys(projectData).length > 0 ? (
      projectData.users.map((user) => (
        <RowItem key={user.username} user={user} />
      ))
    ) : (
      <tr>
        <td>
          <p>"loading..."</p>
        </td>
      </tr>
    );

  const rowDataIssues =
    Object.keys(projectData).length > 0 ? (
      sortIssue(projectData.issues).map((issue) => (
        <RowItemIssue key={issue.id} issue={issue} />
      ))
    ) : (
      <tr>
        <td>
          <p>"loading..."</p>
        </td>
      </tr>
    );

  useEffect(() => {
    try {
      getProjectUsers(projectId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="pd">
      <h3 className="pd-MainTitle">Project Details</h3>
      <p className="pd-name">Name: {info.name}</p>
      <p className="pd-name">Description: {info.project_desc}</p>

      <div className="pd-users">
        <h3 className="pd-title">Assigned Users</h3>

        <table className="pd-usersTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Role</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>{rowData}</tbody>
        </table>
      </div>

      <div className="pd-tickets">
        <h3 className="pd-title">Project Tickets</h3>

        {/* Turn Add Ticket page into a Modal Later!! */}
        <Link to={`/addticket/${projectId}`}>Create New</Link>

        <table className="pd-issuesTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Created</th>
              <th>Assigned To</th>
            </tr>
          </thead>

          <tbody>{rowDataIssues}</tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projectData: state.users,
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
  getProjectUsers: (projectId) => dispatch(fetchProjectUsers(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
