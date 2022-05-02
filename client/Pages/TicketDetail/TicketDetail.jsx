import React, { useEffect, useState } from "react";

// Modules/Libraries
import moment from "moment";
import { connect } from "react-redux";

// Redux Functions
import { addComment } from "../../store/issue";
import { fetchTicket, deleteComment } from "../../store/issue";

// Components
import ManageTicket from "../ManageTicket/ManageTicket.jsx";

// Reactstrap
import {
  Row,
  Col,
  List,
  Form,
  Card,
  Input,
  Modal,
  Button,
  CardText,
  Container,
  CardTitle,
  CardHeader,
  ModalHeader,
} from "reactstrap";

export const TicketDetail = ({
  userId,
  getTickets,
  ticketData,
  loggedInUser,
  fromTimeline,
  submitComment,
  removeComment,
  selectedTicketId,
}) => {
  const {
    id,
    type,
    title,
    status,
    priority,
    comments,
    createdAt,
    start_date,
    projectName,
    assignedDevs,
    time_estimate,
    issue_summary,
    target_end_date,
    issue_description,
    updatedAt: lastUpdate,
  } = ticketData;

  console.log(ticketData);
  const [formData, setFormData] = useState({ text: "" });
  const [isEditManageOpen, setIsManageTicketOpen] = useState(false);
  const toggleManageTicket = () => setIsManageTicketOpen(!isEditManageOpen);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitComment({
        ...formData,
        projectName,
        issueId: selectedTicketId,
        commenter_username: userId,
      });
      await getTickets(selectedTicketId);

      setFormData({ text: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      console.log(selectedTicketId);
      getTickets(selectedTicketId);
    } catch (error) {
      console.log(error);
    }
  }, [selectedTicketId]);

  const ticketInfo = (
    <>
      <Col xl={fromTimeline ? "12" : "6"} className="mt-3">
        <Card className="shadow p-4">
          <Row className=" mb-2">
            <Col md="3">
              <h6 className="text-muted text-uppercase">Ticket Title</h6>
              <h2 className="text-primary mb-1">{issue_summary}</h2>
            </Col>
            <Col md="3">
              <h6 className="text-muted text-uppercase">Author</h6>
              <p color="primary" className="mb-3">
                {submitter_username}
              </p>
            </Col>
            <Col md="6">
              <h6 className="text-muted text-uppercase">Description</h6>
              <p>{issue_description}</p>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md="3" sm="3" xs="3">
              <h6 className="text-muted text-uppercase">Status</h6>
              <span className="mr-1 mb-2 badge badge-primary badge-pill">
                {status}
              </span>
            </Col>
            <Col md="3" sm="3" xs="3">
              <h6 className="text-muted text-uppercase">Priority</h6>
              <span className="mr-1 mb-2 badge badge-primary badge-pill">
                {priority}
              </span>
            </Col>
            <Col md="3" sm="3" xs="3">
              <h6 className="text-muted text-uppercase">Type</h6>
              <span className="mr-1 mb-2 badge badge-primary badge-pill">
                {type}
              </span>
            </Col>

            <Col md="3">
              <h6 className="text-muted text-uppercase">
                Time Estimate (Hours)
              </h6>
              <span>{time_estimate || "Null"}</span>
            </Col>
          </Row>
          <hr className="pt-0" />
          <h6 className="text-muted text-uppercase">Assigned Devs </h6>
          <List type="unstyled">
            {assignedDevs ? (
              assignedDevs.map((dev, index) => {
                return (
                  <li
                    key={dev.id}
                    id={dev.id}
                    style={{ listStyleType: "none", padding: 0 }}
                  >
                    {`${dev.username} `}
                  </li>
                );
              })
            ) : (
              <li>No devs assigned</li>
            )}
          </List>
        </Card>
      </Col>
    </>
  );

  const commentSection = (
    <>
      <Col xl={fromTimeline ? "12" : "6"} className="mt-3">
        <Card className="shadow">
          <CardHeader className="mb-3">
            <h4>Comments</h4>
          </CardHeader>
          <Row className="m-3">
            <Form
              className="input-group"
              onSubmit={(event) => handleSubmit(event)}
            >
              <Input
                id="comment"
                type="text"
                name="text"
                placeholder="Enter comment"
                value={formData.text}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <Button type="submit" color="primary">
                  Comment
                </Button>
              </div>
            </Form>
          </Row>
          {comments ? (
            comments.map((comment) => {
              return (
                <Card body className="shadow m-1" key={comment.id}>
                  <CardTitle tag="h5">
                    <Row className="justify-content-between mx-1 mb-0">
                      <div>
                        <span id={comment.commenter_username} className="">
                          {comment.commenter_username} -{" "}
                        </span>
                        <span className="h6">
                          {moment(comment.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </span>{" "}
                      </div>

                      {loggedInUser.username === comment.commenter_username && (
                        <Button
                          className="p-1 bg-none"
                          color="danger"
                          size="sm"
                          onClick={() => {
                            removeComment(comment.id);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      )}
                    </Row>
                  </CardTitle>
                  <CardText className="ml-1">{comment.text}</CardText>
                </Card>
              );
            })
          ) : (
            <></>
          )}
        </Card>
      </Col>
    </>
  );

  return (
    <>
      <Card className="shadow">
        <CardHeader>
          <Row>
            <Col>
              <h3 className="mb-0">Selected Ticket Info</h3>
            </Col>
            <Col style={{ textAlign: "right" }}>
              {selectedTicketId &&
                (loggedInUser.roleName === "Project Manager" ||
                  loggedInUser.roleName === "Master") && (
                  <>
                    <Button
                      color="primary"
                      onClick={toggleManageTicket}
                      size="sm"
                    >
                      Manage
                    </Button>
                    <Modal
                      isOpen={isEditManageOpen}
                      toggle={toggleManageTicket}
                    >
                      <Container className="m-4 align-self-center" fluid>
                        <ModalHeader toggle={toggleManageTicket}>
                          Create Ticket
                        </ModalHeader>
                        <ManageTicket
                          ticketId={selectedTicketId}
                          toggleManageTicket={toggleManageTicket}
                        />
                      </Container>
                    </Modal>
                  </>
                )}
            </Col>
          </Row>
        </CardHeader>
        {!selectedTicketId ? (
          <div style={{ textAlign: "center" }} className="m-4">
            No ticket selected
          </div>
        ) : (
          <>
            <Row className=" p-2">
              {ticketInfo} {commentSection}
            </Row>
          </>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  projectData: state.users,
  loggedInUser: state.auth,
  userId: state.auth.username,
  ticketData: state.issue || {},
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (ticketId) => dispatch(fetchTicket(ticketId)),
  removeComment: (commentId) => dispatch(deleteComment(commentId)),
  submitComment: (commentInfo) => dispatch(addComment(commentInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetail);
