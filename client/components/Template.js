import React from "react";
import { connect } from "react-redux";

/* COMPONENT */
export const Home = ({ username }) => {
  return (
    <div>
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

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(Home);
