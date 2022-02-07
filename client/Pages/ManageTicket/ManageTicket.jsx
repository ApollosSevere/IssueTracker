import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { fetchTicket, manageTicket } from "../../store/issue";
import { fetchProjectUsers } from "../../store/users";
import TagSelector from "../../components/utils/TagSelector.jsx";
import { loadAttributes } from "../../store/fliedAttributes";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberPicker from "react-widgets/NumberPicker";

const ManageTicket = ({
  getProjectUsers,
  getAttributes,
  getTickets,
  ticketData,
  submitManagedTicket,
  fliedAttributes,
  allProjectUsers,
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
    assigned_users: currentAssignedUsers,
    comments,
  } = ticketData;

  const [formData, setFormData] = useState({ notes: "" });
  const [priorityPick, setPriorityPick] = useState([]);
  const [addUsersPick, setAddUsersPick] = useState([]);
  const [removeUsersPick, setRemoveUsersPick] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [timeEstimate, setTimeEstimate] = useState(0);

  console.log(currentAssignedUsers);

  const assignedUsernames =
    currentAssignedUsers && currentAssignedUsers.map((v) => v.username);

  const unassignedUsers = allProjectUsers.users
    ? allProjectUsers.users.filter(
        (v) => !assignedUsernames.includes(v.username)
      )
    : [];

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
      await submitManagedTicket(
        ticketId,
        {
          ...formData,
          usersToAdd: addUsersPick.map((v) => v.value),
          usersToRemove: removeUsersPick.map((v) => v.value),
          startDate,
          endDate,
          priority: priorityPick.map((v) => v.value),
        },
        "manager"
      );
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
      getProjectUsers(projectName);
      getAttributes();
      getTickets(ticketId);
    } catch (error) {
      console.log(error);
    }
  }, [projectName]);

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
      <p className="td-name">
        Currently Assigned To:{" "}
        {(currentAssignedUsers &&
          currentAssignedUsers.map((user) => user.username).join(", ")) ||
          "unassigned"}
      </p>

      {/* <div
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
      <p className="td-name">Status: {status || "Undecided"}</p> */}

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
        className="yo"
      >
        <p>Projected Start Date: </p>
        <div style={{}}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
        className="yo"
      >
        <p>Projected *End Date: </p>
        <div style={{}}>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          // gap: "30px",
          // alignItems: "center",
          flexDirection: "column",
          marginBottom: "30px",
        }}
        className="yo"
      >
        <p> Time Estimate (Hours) </p>
        <div style={{}}>
          <NumberPicker
            onChange={(value) => setTimeEstimate(value)}
            value={timeEstimate}
            step={0.5}
            min={0}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
        className="yo"
      >
        <p>Set Priority: </p>
        <div style={{ width: "200px" }}>
          <TagSelector
            optionSelected={priorityPick}
            setSelected={setPriorityPick}
            option={fliedAttributes.priority || []}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          // justifyContent: "space-evenly",
          // width: "100%",
          gap: "50px",
          // maxWidth: "55%",
        }}
        className="hey"
      >
        <div style={{ width: "250px" }} className="right">
          <h3>Assign Users</h3>
          <TagSelector
            optionSelected={addUsersPick}
            setSelected={setAddUsersPick}
            option={unassignedUsers}
            multi={true}
          />
        </div>

        <div style={{ width: "250px" }} className="left">
          <h3>Remove Users</h3>
          <TagSelector
            optionSelected={removeUsersPick}
            setSelected={setRemoveUsersPick}
            option={currentAssignedUsers || []}
            multi={true}
          />
        </div>
      </div>

      <h3>Add Notes:</h3>

      <form onSubmit={(event) => handleSubmit(event)} className="writeForm">
        <div className="writeFormGroup">
          <textarea
            style={{ width: "350px", height: "300px" }}
            className="writeInput"
            placeholder="Notes .."
            type="text"
            // autoFocus={true}
            onChange={handleChange}
            name="notes"
          />
        </div>

        <button className="writeSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allProjectUsers: state.users || [],
  userId: state.auth.username,
  ticketData: state.issue || {},
  fliedAttributes: state.fliedAttributes,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (ticketId) => dispatch(fetchTicket(ticketId)),
  getAttributes: () => dispatch(loadAttributes()),
  getProjectUsers: (projectId) => dispatch(fetchProjectUsers(projectId)),
  submitManagedTicket: (ticketId, updatedObj, userType) =>
    dispatch(manageTicket(ticketId, updatedObj, userType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTicket);
