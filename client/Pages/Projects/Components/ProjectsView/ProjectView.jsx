import React from "react";
import "./projectView.css";

// Modules/Libraries
import { connect } from "react-redux";
import { TailSpin } from "react-loading-icons";
import { Link, useHistory } from "react-router-dom";

// Redux Functions
import { deleteProject } from "../../../../store/project";

// Reactstrap

import {
  Badge,
  Media,
  Progress,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";

const ProjectItem = ({ project, removeProject }) => {
  const history = useHistory();
  const { name, users } = project;

  const issues = project.issues.length;
  const resolvedIssues = project.issues.filter(
    (issue) => issue.status === "Resolved"
  ).length;

  const rate = issues === 0 ? 100 : Math.round((100 * resolvedIssues) / issues);

  const colorClass =
    rate <= 50
      ? "bg-danger"
      : rate < 90
      ? "progress-bar progress-bar-striped bg-warning"
      : "bg-success";

  return (
    <tr>
      <th
        style={{
          paddingLeft: "50px",
        }}
        scope="row"
      >
        <Media className="align-items-center">
          <a
            className=" img-thumbnail mr-3"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
            style={{
              backgroundColor: "white",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              objectFit: "cover",
            }}
          >
            <img
              alt="..."
              style={{ width: "30px", height: "30px" }}
              src={
                project.image_location
                  ? project.image_location
                  : // : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    project.image
              }
            />
          </a>
          <Media>
            <Link
              style={{ color: "black" }}
              to={`/main/projectDetail/${project.name}`}
            >
              <span className="mb-0 text-sm">{name}</span>
            </Link>
          </Media>
        </Media>
      </th>

      <td style={{ textAlign: "center" }}>$2,500 USD</td>

      <td>
        <Badge
          color=""
          className="badge-dot mr-4 d-flex justify-content-center align-items-center"
        >
          <i className="bg-warning" />
          pending
        </Badge>
      </td>

      <td>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="avatar-group"
        >
          {users &&
            users.map((user, i) => (
              <>
                {i < 4 && (
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
          {users && users.length > 4 && "+"}
        </div>
      </td>

      <td>
        <div className="d-flex justify-content-center align-items-center">
          <span className="mr-2"> %{rate}</span>
          <div>
            <Progress
              max="100"
              value={rate === 0 ? 5 : rate}
              barClassName={colorClass}
            />
          </div>
          <span className="ml-2"> {`${resolvedIssues + "/" + issues}`}</span>
        </div>
      </td>

      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
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
              onClick={(e) => {
                e.preventDefault();
                history.push(`/main/addProject/${name}`);
              }}
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={(e) => {
                e.preventDefault();
                removeProject(name);
              }}
            >
              Remove
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export const ProjectView = ({ projects, error, removeProject, isLoading }) => {
  return (
    <>
      <tbody>
        {error && error.response ? (
          <tr>
            <td className="no-projects" colspan="6">
              <div>
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
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <ProjectItem
                      key={project.name}
                      removeProject={removeProject}
                      project={project}
                    />
                  ))
                ) : (
                  <tr>
                    <td className="no-projects" colspan="6">
                      No projects to work on!
                    </td>
                  </tr>
                )}
              </>
            )}
          </>
        )}
      </tbody>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.projects.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeProject: (projectId) => dispatch(deleteProject(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
