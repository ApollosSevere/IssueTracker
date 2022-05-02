import "./createTicket.css";
import React, { useState, useEffect } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// Redux Functions
import { addTicket } from "../../store/issue";
import { loadProjects } from "../../store/project";
import { fetchProjectUsers } from "../../store/users";
import { updateIssueStatus } from "../../store/issue";
import { fetchMyTickets } from "../../store/myTickets";
import { addNotification } from "../../store/notifications";
import { loadAttributes } from "../../store/fliedAttributes";

// Components
import TagSelector from "../../components/utils/TagSelector.jsx";

import {
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  Container,
  FormGroup,
} from "reactstrap";

export const CreateTicket = ({
  edit,
  ticket,
  username,
  projects,
  updateIssue,
  projectName,
  getProjects,
  projectUsers,
  submitTicket,
  getMyTickets,
  getAttributes,
  fliedAttributes,
  getProjectUsers,
  toggleEditTicket,
  fromMyTicketsPage,
  toggleCreateTicket,
  submitNotification,
}) => {
  const { projectId } = useParams();
  const [typePick, setTypePick] = useState([]);
  const [projectPick, setProjectPick] = useState([]);
  const [formData, setFormData] = useState(edit ? ticket : {});

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  useEffect(() => {
    try {
      getProjects();
      getAttributes();
      getProjectUsers(projectName);
      setTypePick(edit ? { value: ticket.type, label: ticket.type } : []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const typePicked = typePick.value;
      const projectPicked = projectPick.value;

      const users = projectUsers.users
        .filter(
          (user) =>
            user.roleName === "Project Manager" || user.roleName === "Master"
        )
        .map((user) => user.username);

      if (!edit) {
        const newTicket = await submitTicket({
          ...formData,
          projectName: projectPicked || projectId,
          type: typePicked,
          submitter_username: username,
          status: "Unassigned",
        });

        submitNotification({
          usersToNotify: users,
          updateObj: {
            summary: `New Issue submitted by: ${username}`,
            subject: "Issue Created",
            issueId: newTicket.id,
            projectName,
          },
        });
        toggleCreateTicket();
      } else {
        await updateIssue(ticket.id, {
          ...formData,
        });

        submitNotification({
          usersToNotify: users,
          updateObj: {
            summary: `Update: Ticket updated by: ${username}`,
            subject: "Issue Created",
            issueId: ticket.id,
            projectName: ticket.projectName,
          },
        });
        toggleEditTicket();
      }

      await getProjects();
      await getMyTickets(username);
      await getProjectUsers([projectName]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid>
        <Form onSubmit={(event) => handleSubmit(event)}>
          {fromMyTicketsPage && (
            <Row>
              <Col>
                <FormGroup>
                  <Label
                    htmlFor="title"
                    className="lease-form-label mandatory-entry"
                  >
                    Project
                  </Label>
                  <TagSelector
                    option={projects}
                    optionSelected={projectPick}
                    setSelected={setProjectPick}
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
          {!edit && (
            <Row>
              <Col>
                <FormGroup>
                  <Label
                    htmlFor="title"
                    className="lease-form-label mandatory-entry"
                  >
                    Type
                  </Label>
                  <TagSelector
                    optionSelected={typePick}
                    setSelected={setTypePick}
                    option={fliedAttributes.type || []}
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <FormGroup>
                <Label
                  htmlFor="title"
                  className="lease-form-label mandatory-entry"
                >
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  className="lease-form-input"
                  value={formData.title || ""}
                  placeholder="Enter ticket title"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label
                  htmlFor="title"
                  className="lease-form-label mandatory-entry"
                >
                  Summary
                </Label>
                <Input
                  type="text"
                  id="summary"
                  name="issue_summary"
                  onChange={handleChange}
                  className="lease-form-input"
                  placeholder="Enter summary"
                  value={formData.issue_summary || ""}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <Label for="ticketDescription">Ticket Description</Label>
                <Input
                  rows="5"
                  type="textarea"
                  id="ticketDescription"
                  onChange={handleChange}
                  name="issue_description"
                  placeholder="Enter description"
                  value={formData.issue_description || ""}
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

const mapStateToProps = (state) => {
  return {
    projectUsers: state.users,
    username: state.auth.username,
    projects: state.projects || [],
    fliedAttributes: state.fliedAttributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => dispatch(loadProjects()),
    getAttributes: () => dispatch(loadAttributes()),
    updateIssue: (issueId, updatedObj) =>
      dispatch(updateIssueStatus(issueId, updatedObj)),
    getMyTickets: (userId) => dispatch(fetchMyTickets(userId)),
    submitTicket: (ticketInfo) => dispatch(addTicket(ticketInfo)),
    getProjectUsers: (projectId) => dispatch(fetchProjectUsers(projectId)),
    submitNotification: (updatedObj) => dispatch(addNotification(updatedObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);
