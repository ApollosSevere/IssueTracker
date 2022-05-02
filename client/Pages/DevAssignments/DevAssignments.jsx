import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";

// Components
import Kanban from "../../Components/Kanban/Kanban.js";

// Reactstrap
import { Col, Row, Container } from "reactstrap";

// Redux Functions
import { loadUserChores, chore_cleanup } from "../../store/chore";

export const DevAssignments = ({
  user,
  userChores,
  choreCleanup,
  getUserChores,
}) => {
  const [chores, setChores] = useState(
    userChores.singleUserChore ? userChores.singleUserChore.current_tasks : []
  );

  useEffect(() => {
    try {
      const data = getUserChores(user.username);
    } catch (error) {
      console.log(error);
    }
    return () => {
      choreCleanup();
    };
  }, [user]);

  useEffect(() => {
    try {
      setChores(
        userChores.singleUserChore
          ? userChores.singleUserChore.current_tasks
          : []
      );
    } catch (error) {
      console.log(error);
    }
  }, [userChores]);

  return (
    <div className="DA">
      {userChores && (
        <Container className="mt--7" fluid>
          <Row
            style={{ position: "absolute", top: "70px" }}
            className="mt-0"
            id={user.id}
          >
            <Col>
              <h1 className="text-white d-none d-lg-inline-block">
                {user && user.username} Assignments
              </h1>
            </Col>
          </Row>

          <div style={{ position: "relative", width: "100%" }}>
            {chores && <Kanban userChores={chores} />}
          </div>
        </Container>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
  userChores: state.chore,
});

const mapDispatchToProps = (dispatch) => ({
  choreCleanup: () => dispatch(chore_cleanup()),
  getUserChores: (username) => dispatch(loadUserChores(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DevAssignments);
