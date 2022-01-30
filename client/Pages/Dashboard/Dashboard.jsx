import React from "react";
import { connect } from "react-redux";

/* COMPONENT */
export const Dashboard = ({ username }) => {
  return (
    <div>
      <h3>DASHBOARD</h3>
      <h3>Welcome, {username}</h3>
    </div>
  );
};

/* CONTAINER */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Dashboard);
