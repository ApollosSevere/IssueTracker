import "./Tables.css";
import React, { useState, useMemo } from "react";

// Modules/Libraries
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";
import { TailSpin } from "react-loading-icons";
import { deleteIssue } from "../../store/users";

// Components
import PaginationComponent from "./PaginationComponent";
import CreateTicket from "../../Pages/CreateTicket/CreateTicket.jsx";

// Reactstrap
import {
  Row,
  Col,
  Card,
  Media,
  Table,
  Modal,
  Button,
  Container,
  CardHeader,
  CardFooter,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const TicketItem = ({
  user,
  ticket,
  projectId,
  removeIssue,
  fromMyTicketsPage,
  setSelectedTicketId,
}) => {
  const history = useHistory();
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);
  const toggleEditTicket = () => setIsEditTicketOpen(!isEditTicketOpen);

  return (
    <>
      <tr
        key={ticket.id}
        id={ticket.id}
        className="ticketRow"
        onClick={() => {
          !fromMyTicketsPage && setSelectedTicketId(ticket.id);
          fromMyTicketsPage &&
            history.push(
              `/main/projectDetail/${ticket.projectName}/${ticket.id}`
            );
        }}
      >
        <th>
          <Media>{ticket.issue_summary}</Media>
        </th>
        <td
          style={{
            whiteSpace: "unset",
            wordWrap: "break-word",
          }}
        >
          {ticket.issue_description.split("").filter((letter, i) => i < 60)} ...
        </td>
        <td key={ticket.id}>{ticket.submitter_username}</td>

        <td className="text-right">
          {(user.username === ticket.submitter_username ||
            user.roleName === "Master" ||
            user.roleName === "Project Manager") && (
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                role="button"
                size="sm"
                color=""
                onClick={() => {
                  setSelectedTicketId(ticket.id);
                }}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-arrow" right>
                {user.username === ticket.submitter_username && (
                  <DropdownItem onClick={() => toggleEditTicket()}>
                    Edit Ticket
                    <Modal isOpen={isEditTicketOpen} toggle={toggleEditTicket}>
                      <Container className="m-4 align-self-center" fluid>
                        <ModalHeader toggle={toggleEditTicket}>
                          Edit Ticket
                        </ModalHeader>
                        <CreateTicket
                          edit={true}
                          ticket={ticket}
                          projectName={projectId || "Fresh"}
                          toggleEditTicket={toggleEditTicket}
                        />
                      </Container>
                    </Modal>
                  </DropdownItem>
                )}

                {(user.roleName === "Master" ||
                  user.roleName === "Project Manager") && (
                  <DropdownItem
                    onClick={() => {
                      removeIssue(ticket.id);
                    }}
                  >
                    Remove Ticket
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </td>
      </tr>
    </>
  );
};

const ProjectTicketsTable = ({
  user,
  error,
  isLoading,
  projectId,
  removeIssue,
  projectTickets,
  isNewTicketOpen,
  fromMyTicketsPage,
  toggleCreateTicket,
  setSelectedTicketId,
}) => {
  //pagination
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentTicketPage, setCurrentTicketPage] = useState(1);
  const ticketsPerPage = fromMyTicketsPage ? 8 : 5;

  // pagination for tickets table
  const ticketsData = useMemo(() => {
    console.log(projectTickets);
    if (projectTickets) {
      if (!projectTickets.error) {
        let computedTickets = fromMyTicketsPage
          ? projectTickets
          : projectTickets.issues
          ? projectTickets.issues
          : [];

        setTotalTickets(computedTickets.length || []);

        //current page slice
        return computedTickets.slice(
          (currentTicketPage - 1) * ticketsPerPage,
          (currentTicketPage - 1) * ticketsPerPage + ticketsPerPage
        );
      }
    }
  }, [projectTickets, currentTicketPage]);

  return (
    <Card
      className={`shadow ${
        fromMyTicketsPage ? "custom-card-2" : "custom-card"
      }`}
    >
      <CardHeader>
        <Row className="align-items-center">
          <Col>
            <h3 className="mb-0">Tickets</h3>
          </Col>
          <Col>
            <div className="col text-right">
              <Button color="primary" onClick={toggleCreateTicket} size="sm">
                New Ticket
              </Button>

              <Modal isOpen={isNewTicketOpen} toggle={toggleCreateTicket}>
                <Container className="m-4 align-self-center" fluid>
                  <ModalHeader toggle={toggleCreateTicket}>
                    Create Ticket
                  </ModalHeader>
                  <CreateTicket
                    projectName={projectId}
                    toggleCreateTicket={toggleCreateTicket}
                    fromMyTicketsPage={fromMyTicketsPage}
                  />
                </Container>
              </Modal>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush custom-table" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Ticket Title</th>
            <th scope="col">Description</th>
            <th scope="col">Ticket Author</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {error && error.response ? (
            <tr>
              <td className="no-projects" colspan="6">
                <div>
                  {console.log(projectTickets)}
                  Warning: {error.response.data.toString().split(":")[0]}{" "}
                </div>
              </td>
            </tr>
          ) : (
            <>
              {isLoading ? (
                <>
                  <tr>
                    <td className="no-projects" colspan="6">
                      <TailSpin stroke="blue" />
                    </td>
                  </tr>
                </>
              ) : (
                <>
                  {console.log(ticketsData)}
                  {ticketsData.length > 0 ? (
                    ticketsData.map((ticket) => (
                      <TicketItem
                        user={user}
                        key={ticket.id}
                        ticket={ticket}
                        projectId={projectId}
                        removeIssue={removeIssue}
                        fromMyTicketsPage={fromMyTicketsPage}
                        setSelectedTicketId={setSelectedTicketId}
                      />
                    ))
                  ) : (
                    <tr>
                      <td className="no-projects" colspan="6">
                        There are no submitted tickets
                      </td>
                    </tr>
                  )}
                </>
              )}
            </>
          )}
        </tbody>
      </Table>
      <CardFooter>
        <PaginationComponent
          total={totalTickets}
          itemsPerPage={ticketsPerPage}
          currentPage={currentTicketPage}
          onPageChange={(page) => setCurrentTicketPage(page)}
        />
      </CardFooter>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeIssue: (issueId) => dispatch(deleteIssue(issueId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTicketsTable);
