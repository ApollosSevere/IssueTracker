import React, { useEffect } from "react";

// Redux Functions
import { me } from "./store/auth.js";

// Components
import Main from "./layouts/Main.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";

// Modules/Libraries
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";

function App({ loadInitialData, isLoggedIn }) {
  useEffect(() => {
    loadInitialData();
  });

  return (
    <>
      {isLoggedIn ? (
        <Switch>
          <Route path="/" render={(props) => <Main {...props} />} />

          <Route path="*">
            <h1>404 No page found</h1>
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/"
            render={(props) => {
              return <AuthLayout {...props} />;
            }}
          />
        </Switch>
      )}
    </>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.username,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(App));
