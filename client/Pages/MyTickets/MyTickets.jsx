import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";

// Redux Functions
import { fetchProjectUsers } from "../../store/users";
import { fetchMyTickets } from "../../store/myTickets";

// Components
import ProjectTicketsTable from "../../components/Tables/ProjectTicketsTable";

// Reactstrap
import { Row, Col, Container } from "reactstrap";

export const MyTickets = ({ userId, myTickets, getMyTickets, projectData }) => {
  const [isLoading, setLoading] = useState(true);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState("");

  const toggleCreateTicket = () => setIsNewTicketOpen(!isNewTicketOpen);

  useEffect(() => {
    try {
      userId && getMyTickets(userId, setLoading);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  return (
    <>
      <Container style={{ height: "100vh" }} className="mt--7 vh-70" fluid>
        <Row className="mt-0">
          <Col>
            <h1 className="text-white d-none d-lg-inline-block">
              Your Submitted Tickets
            </h1>
          </Col>
        </Row>
        <Row>
          <Col xl="12" className="mt-3">
            {
              <ProjectTicketsTable
                isLoading={isLoading}
                projectId={projectData.id}
                fromMyTicketsPage={true}
                projectTickets={myTickets}
                isNewTicketOpen={isNewTicketOpen}
                toggleCreateTicket={toggleCreateTicket}
                setSelectedTicketId={setSelectedTicketId}
              />
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  projectData: state.users,
  myTickets: state.myTickets,
  userId: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  getMyTickets: (userId, setLoading) =>
    dispatch(fetchMyTickets(userId, setLoading)),
  getProjectUsers: (projectId) => dispatch(fetchProjectUsers(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyTickets);
