import React, { useState } from "react";
import "./kanban.css";

// Modules/Libraries
import { connect } from "react-redux";
import Board, { moveCard } from "@lourenci/react-kanban";

// Components
import AssignmentInfo from "./utils/AssignmentInfo.jsx";

// Redux Functions
import {
  addNotification,
  fetchNotifications,
} from "../../store/notifications.js";
import { updateIssueStatus } from "../../store/issue";

// Reactstrap
import { UncontrolledTooltip, Modal, Container, ModalHeader } from "reactstrap";

const board = ({ openChores, inProgressChores, resolvedChores }) => {
  console.log(openChores, resolvedChores);

  return {
    columns: [
      {
        id: 1,
        title: "To Do",
        cards: openChores,
      },
      {
        id: 2,
        title: "In Progress",
        cards: inProgressChores,
      },
      {
        id: 3,
        title: "Resolved",
        cards: resolvedChores,
      },
    ],
  };
};

const Card = ({ content }) => {
  const [isEditManageOpen, setIsManageTicketOpen] = useState(false);
  const toggleManageTicket = () => setIsManageTicketOpen(!isEditManageOpen);
  const { cardInfo } = content;

  const badges = {
    Bug: "bg-gradient-warning",
    Error: "bg-gradient-danger",
    "Feature Request": "bg-gradient-success",
    "Service Request": "bg-gradient-light",
    Other: "bg-gradient-dark",
  };

  return (
    <div onClick={() => toggleManageTicket()} className="react-kanban-card">
      <span
        className={`mt-2 badge badge-sm type ${
          badges[cardInfo.type || "Other"]
        }`}
      >
        {cardInfo.type || "Other"}
      </span>

      <p class="text mt-2">{content.title}</p>

      <div>
        <Modal isOpen={isEditManageOpen} toggle={toggleManageTicket}>
          <Container className="m-4 align-self-center" fluid>
            <ModalHeader toggle={toggleManageTicket}>
              Ticket Details
            </ModalHeader>
            <AssignmentInfo
              selectedTicketId={cardInfo.id}
              toggleManageTicket={toggleManageTicket}
              ticketData={cardInfo}
            />
          </Container>
        </Modal>
      </div>
      <div class="bottom-area">
        <div>
          <i class="fa fa-paperclip me-1 text-sm" aria-hidden="true"></i>
          <span class="text-sm">3</span>
        </div>
        <div class="photos">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="avatar-group"
          >
            {cardInfo.assigned_users.map((user, i) => (
              <>
                {i < 3 && (
                  <>
                    <a
                      className="avatar avatar-sm"
                      href="#pablo"
                      id={`tooltip742438047${i}${user.username.split(" ")[0]}`}
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          user.image_location ? user.image_location : user.image
                        }
                      />
                    </a>
                    <UncontrolledTooltip
                      delay={0}
                      target={`tooltip742438047${i}${
                        user.username.split(" ")[0]
                      }`}
                    >
                      {user.username}
                    </UncontrolledTooltip>
                  </>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Kanban({
  userId,
  userChores,
  getNotifications,
  submitNotification,
  submitUpdatedStatus,
}) {
  const [chores] = useState(userChores);
  const [isLoading, setLoading] = useState(true);

  let id = 0;

  const openChores = chores
    .filter((chore) => chore.status === "Open")
    .map((chore, i) => ({
      id: id++,
      title: chore.issue_summary,
      description: chore.issue_summary,
      cardInfo: chore,
    }));

  const inProgressChores = chores
    .filter((chore) => chore.status === "In Progress")
    .map((chore, i) => ({
      id: id++,
      title: chore.issue_summary,
      description: chore.issue_summary,
      cardInfo: chore,
    }));

  const resolvedChores = chores
    .filter((chore) => chore.status === "Resolved")
    .map((chore, i) => ({
      id: id++,
      title: chore.issue_summary,
      description: chore.issue_summary,
      cardInfo: chore,
    }));

  const sortedChores = { openChores, inProgressChores, resolvedChores };
  const [controlledBoard, setBoard] = useState(board(sortedChores));

  const handleCardMove = async (_card, source, destination) => {
    const destinationColumn = { 1: "Open", 2: "In Progress", 3: "Resolved" };
    const { cardInfo } = _card;
    const { fromColumnId } = source;
    const { toColumnId } = destination;

    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);

    if (fromColumnId !== toColumnId) {
      await submitUpdatedStatus(cardInfo.id, {
        status: destinationColumn[destination.toColumnId],
      });
      console.log(cardInfo);

      if (destinationColumn[destination.toColumnId] === "Resolved") {
        console.log("submitting");
        await submitNotification({
          updateObj: {
            summary: `New Resolved Ticket: Id ${cardInfo.id}`,
            subject: "Issue Resolved",
            issueId: cardInfo.id,
            projectName: cardInfo.projectName,
          },
        });

        await submitNotification({
          updateObj: {
            summary: `Your Ticket has been resolved: Id ${cardInfo.id}`,
            subject: "Submitter Issue Resolved",
            issueId: cardInfo.id,
            projectName: cardInfo.projectName,
            cardInfo,
          },
        });
      }
    }

    await getNotifications(userId);
  };

  return (
    <Board
      onCardDragEnd={handleCardMove}
      renderCard={(stuff) => (
        <Card content={stuff} style={{ width: "100%" }}></Card>
      )}
    >
      {controlledBoard}
    </Board>
  );
}

const mapStateToProps = (state) => ({
  userId: state.auth.username,
  ticketData: state.issue || {},
  fliedAttributes: state.fliedAttributes,
});

const mapDispatchToProps = (dispatch) => ({
  submitUpdatedStatus: (ticketId, updatedObj) =>
    dispatch(updateIssueStatus(ticketId, updatedObj)),
  submitNotification: (updatedObj) => dispatch(addNotification(updatedObj)),
  getNotifications: (userId) => dispatch(fetchNotifications(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
