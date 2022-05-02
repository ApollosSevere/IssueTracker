import "./manage.css";
import React, { useState, useEffect, useMemo } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Redux Functions
import { manageProject } from "../../store/project";
import { loadProjects } from "../../store/project";
import { loadCompanyUsers, updateUserRole } from "../../store/companyUsers";

// Components
import TagSelector from "../../components/Utils/TagSelector.jsx";
import PaginationComponent from "../../components/Tables/PaginationComponent";

// Reactstrap
import {
  Row,
  Col,
  Card,
  Label,
  Media,
  Table,
  Button,
  CardBody,
  Container,
  FormGroup,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const ProjectItem = ({
  project,
  setLoading,
  getProjects,
  companyUsers,
  projectUsers,
  submitManagedProject,
}) => {
  const history = useHistory();

  const [addUsersPick, setAddUsersPick] = useState([]);
  const [removeUsersPick, setRemoveUsersPick] = useState([]);

  const assignedUsernames = projectUsers && projectUsers.map((v) => v.username);

  const unassignedUsers = companyUsers
    ? companyUsers.filter((v) => !assignedUsernames.includes(v.username))
    : [];

  const handleSubmit = async (event) => {
    console.log("running");
    event.preventDefault();
    try {
      await submitManagedProject(
        project.name,
        {
          name: project.name,

          usersToAdd: addUsersPick.map((v) => v.value),
          usersToRemove: removeUsersPick.map((v) => v.value),
        },
        "manager"
      );

      setAddUsersPick([]);
      setRemoveUsersPick([]);
      getProjects(setLoading);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col
        style={{ marginBottom: "80px !important" }}
        className="order-xl-2 mb-5 mb-xl-0"
        xl="4"
      >
        <Card className="card-profile shadow">
          <Row
            style={{ marginBottom: "35px" }}
            className="justify-content-center"
          >
            <Col className="order-lg-2" lg="3">
              <div className="card-profile-image">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="rounded-circle avatar-reg"
                    style={{
                      backgroundColor: "white",
                    }}
                    src={
                      project.image_location
                        ? project.image_location
                        : project.image
                    }
                  />
                </a>
              </div>
            </Col>
          </Row>
          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
            <div className="d-flex justify-content-between">
              <Button
                className="mr-4"
                color="info"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/main/projectDetail/${project.name}`);
                }}
                size="sm"
              >
                View
              </Button>

              {(addUsersPick.length > 0 || removeUsersPick.length > 0) && (
                <Button
                  className="float-right"
                  color="default"
                  href="#pablo"
                  onClick={handleSubmit}
                  size="sm"
                >
                  Update
                </Button>
              )}
            </div>
          </CardHeader>
          <CardBody className="pt-0 pt-md-4">
            <div className="text-center">
              <h3>{project.name}</h3>

              <hr className="my-4" />
            </div>

            <Row>
              <div className="col-12">
                <FormGroup>
                  <Label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="assignees"
                  >
                    Assign Team Members
                  </Label>
                  <TagSelector
                    optionSelected={addUsersPick}
                    setSelected={setAddUsersPick}
                    option={unassignedUsers}
                    multi={true}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <Label
                    style={{ display: "flex", justifyContent: "center" }}
                    for="removingDevs"
                  >
                    Remove Team Members
                  </Label>
                  <TagSelector
                    optionSelected={removeUsersPick}
                    setSelected={setRemoveUsersPick}
                    option={projectUsers || []}
                    multi={true}
                  />
                </FormGroup>
              </div>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <div style={{ marginBottom: "500px" }}></div>
    </>
  );
};

export const Manage = ({
  user,
  error,
  projects,
  updateRole,
  getProjects,
  companyUsers,
  getCompanyUsers,
  submitManagedProject,
}) => {
  const ticketsPerPage = 10;
  const [manageTab, setManageTab] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [totalTickets, setTotalTickets] = useState(0);
  const [currentTicketPage, setCurrentTicketPage] = useState(1);

  useEffect(() => {
    try {
      getCompanyUsers();
      getProjects(setLoading);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUserRole = (roleName, username, e) => {
    e.preventDefault();

    try {
      updateRole(username, { roleName });
    } catch (error) {
      console.log(error);
    }
  };

  const usersData = useMemo(() => {
    let computedTickets = companyUsers;

    setTotalTickets(computedTickets.length);

    //current page slice
    return computedTickets.slice(
      (currentTicketPage - 1) * ticketsPerPage,
      (currentTicketPage - 1) * ticketsPerPage + ticketsPerPage
    );
  }, [companyUsers, currentTicketPage]);

  const projectItems = (
    <Container className="mt--7" fluid>
      <Row>
        <Col style={{ marginBottom: "70px", marginTop: "30px" }}>
          <div class="card shadow-lg mx-4 card-profile-bottom">
            <div class="card-body p-3">
              <div class="row gx-4">
                <div class="col-auto">
                  <div class="avatar avatar-xl position-relative">
                    <img
                      alt="..."
                      className="rounded-circle"
                      src="../../assets/img/theme/team-2-800x800.jpg"
                    />
                  </div>
                </div>
                <div class="col-auto my-auto">
                  <div class="h-100">
                    <h5 class="mb-1 font-weight-bold">{user.username}</h5>
                    <p class="mb-0 text-sm">Current Role: {user.roleName}</p>
                  </div>
                </div>
                <div class="col-lg-4  col-md-6 my-sm-auto ms-sm-auto me-sm-0 ml-auto mt-3">
                  <div class="nav-wrapper menu-nav position-relative end-0">
                    <ul
                      class="nav nav-pills nav-fill p-1 menu-nav"
                      role="tablist"
                    >
                      <li onClick={() => setManageTab(1)} class="nav-item">
                        {console.log(manageTab)}
                        <a
                          className={`${
                            manageTab == 1 && "nav-link"
                          } mb-0 px-0 py-1 d-flex align-items-center justify-content-center `}
                          data-bs-toggle="tab"
                          href="javascript:;"
                          role="tab"
                          aria-selected="false"
                        >
                          <i
                            style={{ marginRight: "4px" }}
                            class="ni ni-folder-17"
                          ></i>
                          <span class="ms-2">Projects</span>
                        </a>
                      </li>
                      <li onClick={() => setManageTab(2)} class="nav-item">
                        <a
                          className={`${
                            manageTab == 2 && "nav-link"
                          } mb-0 px-0 py-1 d-flex align-items-center justify-content-center  `}
                          data-bs-toggle="tab"
                          href="javascript:;"
                          role="tab"
                          aria-selected="false"
                        >
                          <i
                            style={{ marginRight: "3px" }}
                            class="ni ni-single-02"
                          ></i>
                          <span class="ms-2">Users</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {manageTab === 1 && (
        <Row className="projects-tab">
          {projects.length > 0 && Array.isArray(projects) ? (
            projects.map((project) => (
              <ProjectItem
                project={project}
                key={project.name}
                setLoading={setLoading}
                getProjects={getProjects}
                companyUsers={companyUsers}
                projectUsers={project.users}
                submitManagedProject={submitManagedProject}
              />
            ))
          ) : (
            <h3>No projects to work on!</h3>
          )}
        </Row>
      )}

      {manageTab === 2 && companyUsers && (
        <Row>
          <div className="col">
            <Card className={`shadow custom-card-3`}>
              <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Role</th>

                    <th scope="col">Change Role</th>
                  </tr>
                </thead>

                <tbody>
                  {usersData.map((user) => (
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3 avatar-sm "
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={
                                user.image_location
                                  ? user.image_location
                                  : user.image
                              }
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {user.username}
                            </span>
                          </Media>
                        </Media>
                      </th>

                      <td>{user.email}</td>

                      <td>{user.phone_number}</td>
                      <td>{user.role.name}</td>

                      <td style={{}} className="text-left">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            style={{
                              // backgroundColor: "lightgray",
                              marginLeft: "30px",
                            }}
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) =>
                                handleUserRole("Admin", user.username, e)
                              }
                            >
                              Admin
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) =>
                                handleUserRole("Developer", user.username, e)
                              }
                            >
                              Developer
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) =>
                                handleUserRole("Submitter", user.username, e)
                              }
                            >
                              Submitter
                            </DropdownItem>

                            <DropdownItem
                              href="#pablo"
                              onClick={(e) =>
                                handleUserRole(
                                  "Project Manager",
                                  user.username,
                                  e
                                )
                              }
                            >
                              Project Manager
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <CardFooter className="py-4">
                {companyUsers.length > 0 && (
                  <PaginationComponent
                    total={totalTickets}
                    itemsPerPage={ticketsPerPage}
                    currentPage={currentTicketPage}
                    onPageChange={(page) => setCurrentTicketPage(page)}
                  />
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      )}
    </Container>
  );

  return (
    <>
      {error && error.response && (
        <div> Warning: {error.response.data.toString().split(":")[0]} </div>
      )}
      {projectItems}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    error: state.projects.error,
    projects: state.projects || [],
    companyUsers: state.companyUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRole: (userId, updateObj) =>
      dispatch(updateUserRole(userId, updateObj)),
    getCompanyUsers: () => dispatch(loadCompanyUsers()),
    submitManagedProject: (ticketId, updatedObj, userType) =>
      dispatch(manageProject(ticketId, updatedObj, userType)),
    getProjects: (setLoading) => dispatch(loadProjects(setLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
