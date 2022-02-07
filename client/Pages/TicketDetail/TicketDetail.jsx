import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchTicket } from "../../store/issue";
import { fetchProjectUsers } from "../../store/users";
import { addComment } from "../../store/issue";

export const TicketDetail = ({
  projectData,
  getProjectUsers,
  getTickets,
  ticketData,
  submitComment,
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
    comments,
  } = ticketData;

  const [formData, setFormData] = useState({ text: "" });

  const commentView =
    comments &&
    comments.map((comment) => (
      <div key={comment.id}>
        <p style={{ fontSize: "16px" }}>{comment.text}</p>
        <h6>Posted by: {comment.commenter_username}</h6>
        <p style={{ fontSize: "12px" }}>{comment.createdAt}</p>
        <hr />
        <br></br>
      </div>
    ));

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitComment({
        ...formData,
        projectName,
        issueId: ticketId,
        commenter_username: userId,
      });
      await getTickets(ticketId);

      setFormData({ text: "" });
      //   await getProjects();
      //   setPosted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      //   getProjectUsers(projectId);
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
        <Link to={`/manageTicket/${ticketId}`}>Manage</Link>
      </div>
      <p className="td-name">Priority: {priority || "Undecided"}</p>
      <p className="td-name">Type: {type || "loading"}</p>
      <p className="td-name">Status: {status || "Undecided"}</p>

      <h3>Comments</h3>

      {commentView}

      <form onSubmit={(event) => handleSubmit(event)} className="writeForm">
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Comment"
            value={formData.text}
            type="text"
            autoFocus={true}
            onChange={handleChange}
            name="text"
          />
        </div>

        <button className="writeSubmit" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projectData: state.users,
  userId: state.auth.username,
  ticketData: state.issue || {},
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (ticketId) => dispatch(fetchTicket(ticketId)),
  // getProjectUsers: (projectId) => dispatch(fetchProjectUsers(projectId)),
  submitComment: (commentInfo) => dispatch(addComment(commentInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetail);
