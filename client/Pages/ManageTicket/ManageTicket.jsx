import "./manageTicket.css";
import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberPicker from "react-widgets/NumberPicker";

// Redux Functions
import { fetchProjectUsers } from "../../store/users";
import { addNotification } from "../../store/notifications";
import { loadAttributes } from "../../store/fliedAttributes";
import { fetchTicket, manageTicket } from "../../store/issue";

// Components
import TagSelector from "../../components/Utils/TagSelector.jsx";

// Reactstrap
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Container,
  FormGroup,
} from "reactstrap";

const ManageTicket = ({
  ticketId,
  getTickets,
  ticketData,
  getAttributes,
  fliedAttributes,
  allProjectUsers,
  getProjectUsers,
  toggleManageTicket,
  submitNotification,
  submitManagedTicket,
}) => {
  const {
    id,
    type,
    title,
    status,
    priority,
    comments,
    pm_notes,
    createdAt,
    start_date,
    projectName,
    time_estimate,
    issue_summary,
    target_end_date,
    issue_description,
    target_start_date,
    submitter_username,
    updatedAt: lastUpdate,
    assigned_users: currentAssignedUsers,
  } = ticketData;

  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [priorityPick, setPriorityPick] = useState();
  const [timeEstimate, setTimeEstimate] = useState();
  const [addUsersPick, setAddUsersPick] = useState([]);
  const [removeUsersPick, setRemoveUsersPick] = useState([]);
  const [formData, setFormData] = useState({ notes: pm_notes });

  const assignedUsernames =
    currentAssignedUsers && currentAssignedUsers.map((v) => v.username);

  const unassignedUsers =
    allProjectUsers.users && assignedUsernames
      ? allProjectUsers.users.filter(
          (v) => !assignedUsernames.includes(v.username)
        )
      : [];

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const usersToAdd = addUsersPick.map((v) => v.value);
      const usersToRemove = removeUsersPick.map((v) => v.value);

      await submitManagedTicket(
        ticketId,
        {
          ...formData,
          endDate,
          startDate,
          issueId: id,
          projectName,
          timeEstimate,
          priority: priorityPick.value,
          usersToAdd,
          usersToRemove,
          pm_notes: formData.notes,
        },
        "manager"
      );
      await getTickets(ticketId);

      setFormData({ text: "" });

      if (usersToAdd.length > 0) {
        submitNotification({
          usersToNotify: usersToAdd,
          updateObj: {
            summary: `New Task assignment`,
            subject: "Issue Assigned",
            issueId: ticketId,
            projectName,
          },
        });
      }

      if (usersToRemove.length > 0) {
        submitNotification({
          usersToNotify: usersToRemove,
          updateObj: {
            summary: `You have been removed from assignment: ${ticketId}`,
            subject: "Issue Assigned",
            issueId: ticketId,
            projectName,
          },
        });
      }

      if (usersToAdd.length > 0) {
        submitNotification({
          usersToNotify: [submitter_username],
          updateObj: {
            summary: `Your ticket has been assigned to developers`,
            subject: "Issue Assigned",
            issueId: ticketId,
            projectName,
          },
        });
      }

      toggleManageTicket();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      getAttributes();
      getTickets(ticketId);
      getProjectUsers(projectName);
    } catch (error) {
      console.log(error);
    }
  }, [projectName]);

  useEffect(() => {
    try {
      setTimeEstimate(time_estimate ? time_estimate : 0);
      setEndDate(target_end_date ? new Date(target_end_date) : new Date());
      setPriorityPick(priority ? { value: priority, label: priority } : "");
      setStartDate(
        target_start_date ? new Date(target_start_date) : new Date()
      );
    } catch (error) {
      console.log(error);
    }
  }, [target_end_date]);

  return (
    <>
      <Container fluid>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <FormGroup>
                <Label
                  htmlFor="title"
                  className="lease-form-label mandatory-entry"
                >
                  Set Priority
                </Label>

                <TagSelector
                  optionSelected={priorityPick}
                  setSelected={setPriorityPick}
                  option={fliedAttributes.priority || []}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="ticketDescription">Add Notes</Label>
                <Input
                  type="textarea"
                  name="notes"
                  id="ticketDescription"
                  placeholder="Enter Notes"
                  onChange={handleChange}
                  value={formData.notes}
                  rows="5"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <div className="col-6">
              <FormGroup>
                <Label for="assignees">Assign Devs</Label>
                <TagSelector
                  optionSelected={addUsersPick}
                  setSelected={setAddUsersPick}
                  option={unassignedUsers}
                  multi={true}
                />
              </FormGroup>
            </div>
            <div className="col-6">
              <FormGroup>
                <Label for="removingDevs">Remove Devs</Label>
                <TagSelector
                  optionSelected={removeUsersPick}
                  setSelected={setRemoveUsersPick}
                  option={currentAssignedUsers || []}
                  multi={true}
                />
              </FormGroup>
            </div>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="type">Start Date</Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="type">End Date</Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="type">Time Estimate (Hours)</Label>
                <NumberPicker
                  onChange={(value) => setTimeEstimate(value)}
                  value={timeEstimate}
                  step={0.5}
                  min={0}
                />
              </FormGroup>
            </Col>
          </Row>

          <Button color="success" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.username,
  ticketData: state.issue || {},
  allProjectUsers: state.users || [],
  fliedAttributes: state.fliedAttributes,
});

const mapDispatchToProps = (dispatch) => ({
  getAttributes: () => dispatch(loadAttributes()),
  getTickets: (ticketId) => dispatch(fetchTicket(ticketId)),
  submitManagedTicket: (ticketId, updatedObj, userType) =>
    dispatch(manageTicket(ticketId, updatedObj, userType)),
  getProjectUsers: (projectId) => dispatch(fetchProjectUsers(projectId)),
  submitNotification: (updatedObj) => dispatch(addNotification(updatedObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTicket);
