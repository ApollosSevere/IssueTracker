import React from "react";

// Modules/Libraries
import moment from "moment";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux Functions
import { fetchTicket } from "../../../store/issue";
import { addComment } from "../../../store/issue";

// Reactstrap
import { Col, Row, Card, List } from "reactstrap";

export const AssignmentInfo = ({ ticketData, selectedTicketId }) => {
  const {
    id,
    type,
    title,
    status,
    pm_notes,
    comments,
    priority,
    createdAt,
    start_date,
    projectName,
    issue_summary,
    time_estimate,
    target_end_date,
    issue_description,
    submitter_username,
    updatedAt: lastUpdate,
    assigned_users: assignedDevs,
  } = ticketData;

  const history = useHistory();

  return (
    <>
      {!selectedTicketId ? (
        <div className="m-2">No ticket selected</div>
      ) : (
        <>
          <Row>
            <Col xl="12">
              <Card className="shadow p-4">
                <h6 className="text-muted text-uppercase">
                  Project Manager's Notes
                </h6>
                <p style={{ fontSize: "12px" }}>
                  {pm_notes ? pm_notes : "No remarks from Project Manager"}
                </p>
                <hr className="pt-0 custom-hr" />
                <Row className=" mb-2">
                  <Col md="3">
                    <h6 className="text-muted text-uppercase">Ticket Title</h6>
                    <h2
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.push(
                          `/main/projectDetail/${projectName}/${id}`
                        );
                      }}
                      className="text-primary mb-1"
                    >
                      {issue_summary}
                    </h2>
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
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  projectData: state.users,
  userId: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  getTickets: (ticketId) => dispatch(fetchTicket(ticketId)),
  submitComment: (commentInfo) => dispatch(addComment(commentInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentInfo);
