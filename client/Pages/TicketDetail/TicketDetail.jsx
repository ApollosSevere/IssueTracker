import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchTicket } from "../../store/issue";
import { fetchProjectUsers } from "../../store/users";

export const ProjectDetail = ({
  projectData,
  getProjectUsers,
  getTickets,
  ticketData,
  userId,
}) => {
  const { ticketId } = useParams();
  //   const info = projectData ? projectData : "Loading ..";
  const {
    id,
    title,
    issue_summary,
    issue_description,
    target_end_date,
    status,
    priority,
    type,
    start_date,
    projectName,
    time_estimate,
    submitter_username,
    createdAt,
    updatedAt: lastUpdate,
    assigned_users,
  } = ticketData;

  useEffect(() => {
    try {
      //   getProjectUsers(projectId, userId);
      getTickets(ticketId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="td">
      <h3 className="td-MainTitle">Ticket Details</h3>
      <p className="td-name">Title: {title || "none"}</p>
      <p className="td-name">Description: {issue_description || "...."}</p>
      <p className="td-desc">Project: {projectName || "...."}</p>
      <p className="td-created">Created: {createdAt || "...."}</p>
      <p className="td-name">
        Updated: {lastUpdate == createdAt ? "No updates .." : lastUpdate}
      </p>
      <p className="td-name">Submitter: {submitter_username || "...."}</p>

      <div
        style={{ display: "flex", gap: "20px", alignItems: "center" }}
        className="assigned"
      >
        <p className="td-name">
          Assigned To:{" "}
          {(assigned_users &&
            assigned_users.map((user) => user.username).join(", ")) ||
            "...."}
        </p>
        <Link to={`/updateTicket/${ticketId}`}>Edit</Link>
      </div>
      <p className="td-name">Priority: {priority || "Undecided"}</p>
      <p className="td-name">Type: {type || "loading"}</p>
      <p className="td-name">Status: {status || "Undecided"}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projectData: state.users,
  userId: state.auth.id,
  ticketData: state.issue || {},
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (ticketId) => dispatch(fetchTicket(ticketId)),
  getProjectUsers: (projectId, userId) =>
    dispatch(fetchProjectUsers(projectId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
