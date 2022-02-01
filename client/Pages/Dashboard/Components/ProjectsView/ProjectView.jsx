import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProjectItem = ({ project }) => {
  const { name, start_date, target_end_date } = project;
  return (
    <>
      <Link to={`/projectDetail/${project.name}`}>
        <h3 className="pi-name">Project Name: {name}</h3>
      </Link>

      <div className="pi-date">Start Date: {start_date}</div>
      <div className="pi-date">Target End Date: {target_end_date}</div>
    </>
  );
};

export const ProjectView = ({ projects, error }) => {
  const projectItems =
    projects.length > 0 && Array.isArray(projects) ? (
      projects.map((project) => (
        <ProjectItem key={project.name} project={project} />
      ))
    ) : (
      <p>No projects to work on!</p>
    );

  return (
    <div className="pv">
      {console.log(projects)}
      <h3 className="pv-title">Projects</h3>
      {error && error.response && (
        <div> Warning: {error.response.data.toString().split(":")[0]} </div>
      )}
      {projectItems}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.projects.error,
    projects: state.projects,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
