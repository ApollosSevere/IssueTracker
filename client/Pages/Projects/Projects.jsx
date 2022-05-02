import "./projects.css";
import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux Functions
import { loadProjects } from "../../store/project";

// Components
import ProjectView from "./Components/ProjectsView/ProjectView.jsx";

// Reactstrap
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Container,
  CardHeader,
} from "reactstrap";

export const Projects = ({ getProjects, loggedInUser, projects }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadInfo = async () => {
      try {
        getProjects(setLoading);
      } catch (error) {
        console.log(error);
      }
    };
    loadInfo();
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <Container style={{ marginTop: "-3em" }} fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                style={{ display: "flex", alignItems: "center" }}
                className="border-0"
              >
                <h3 className="mb-0">Company Projects</h3>

                <Col style={{ textAlign: "right" }}>
                  {(loggedInUser.roleName === "Project Manager" ||
                    loggedInUser.roleName === "Master") && (
                    <>
                      <Link to={"/main/addProject"}>
                        <Button color="primary" size="sm">
                          New Project
                        </Button>
                      </Link>
                    </>
                  )}
                </Col>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Project</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Status</th>
                    <th scope="col">Users</th>
                    <th scope="col">Tickets Resolved</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <ProjectView projects={projects} isLoading={isLoading} />
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

/* CONTAINER */
const mapState = (state) => {
  return {
    loggedInUser: state.auth,
    projects: state.projects,
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => ({
  getProjects: (setLoading) => {
    dispatch(loadProjects(setLoading));
  },
});

export default connect(mapState, mapDispatch)(Projects);
