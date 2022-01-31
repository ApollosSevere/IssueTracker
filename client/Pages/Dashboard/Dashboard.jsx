import React, { useEffect } from "react";
import { connect } from "react-redux";

import ProjectView from "./Components/ProjectsView/ProjectView.jsx";

import { loadProjects } from "../../store/project";

/* COMPONENT */
export const Dashboard = ({ username, getProjects }) => {
  useEffect(() => {
    try {
      getProjects();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <h3>DASHBOARD</h3>
      <h3>Welcome, {username}</h3>

      <ProjectView />
    </div>
  );
};

/* CONTAINER */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

const mapDispatch = (dispatch) => ({
  getProjects: () => {
    dispatch(loadProjects());
  },
});

export default connect(mapState, mapDispatch)(Dashboard);
