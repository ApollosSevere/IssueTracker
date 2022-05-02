import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// Redux Functions
import { fetchProjectUsers, project_cleanup } from "../../store/users";

// Components
import TicketDetail from "../TicketDetail/TicketDetail.jsx";
import ProjectTeamTable from "../../Components/Tables/ProjectTeamTable";
import ProjectTicketsTable from "../../Components/Tables/ProjectTicketsTable";

// Reactstrap
import { Row, Col, Container } from "reactstrap";

export const ProjectDetail = ({
  error,
  projectData,
  projectCleanup,
  getProjectUsers,
}) => {
  const { projectId, ticketId } = useParams();
  const [isLoading, setLoading] = useState(true);

  const [projectTeam, setProjectTeam] = useState([]);
  const [projectTickets, setProjectTickets] = useState([]);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(ticketId || "");
  const [selectedTicket, setSelectedTicket] = useState({});

  const toggleCreateTicket = () => setIsNewTicketOpen(!isNewTicketOpen);
  const toggleEditTicket = () => setIsEditTicketOpen(!isEditTicketOpen);

  const info = projectData ? projectData : "Loading ..";

  useEffect(() => {
    try {
      getProjectUsers(projectId, setLoading);
    } catch (error) {
      console.log(error);
    }

    return () => {
      projectCleanup();
    };
  }, []);

  return (
    <>
      <Container style={{ height: "90vh" }} className="mt--7 vh-70" fluid>
        <Row className="mt-0">
          <Col>
            <h1 className="text-white d-none d-lg-inline-block">
              {info.name || "loading ..."}
            </h1>
          </Col>
          <Col>
            <h2 className="text-white d-none d-lg-inline-block">
              {info.project_desc || "loading ..."}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xl="4" className="mt-3">
            <ProjectTeamTable
              projectTeam={projectData}
              isLoading={isLoading}
              error={error}
            />
          </Col>

          <Col xl="8" className="mt-3">
            <ProjectTicketsTable
              projectId={projectId}
              projectTickets={projectData}
              setProjectTickets={setProjectTickets}
              projectTeam={projectTeam}
              selectedTicket={selectedTicket}
              setSelectedTicketId={setSelectedTicketId}
              toggleEditTicket={toggleEditTicket}
              toggleCreateTicket={toggleCreateTicket}
              isEditTicketOpen={isEditTicketOpen}
              isNewTicketOpen={isNewTicketOpen}
              isLoading={isLoading}
              error={error}
            />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xl="12">
            <TicketDetail selectedTicketId={selectedTicketId} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  projectData: state.users,
  error: state.users
    ? state.users.error
    : {
        response: { data: "Sorry, something went wrong" },
      },
});

const mapDispatchToProps = (dispatch) => ({
  projectCleanup: () => dispatch(project_cleanup()),
  getProjectUsers: (projectId, setLoading) =>
    dispatch(fetchProjectUsers(projectId, setLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
