import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm/AuthForm";
import ProjectDetail from "./Pages/ProjectDetail/ProjectDetail.jsx";
import CreateTicket from "./Pages/CreateTicket/CreateTicket.jsx";
import { me } from "./store";

import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import TicketDetail from "./Pages/TicketDetail/TicketDetail.jsx";
import ManageTicket from "./Pages/ManageTicket/ManageTicket.jsx";

/* COMPONENT */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {/* Add Sidebar here! --> width: 250px*/}
        {/* Add Navbar here! --> margin-right: 250px */}
        {isLoggedIn ? (
          <Switch>
            {/* For all pages: margin-right: 250px !! */}
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/projectDetail/:projectId" component={ProjectDetail} />
            <Route path="/addticket/:projectId" component={CreateTicket} />
            <Route path="/ticketDetail/:ticketId" component={TicketDetail} />
            <Route path="/manageTicket/:ticketId" component={ManageTicket} />
            <Redirect to="/dashboard" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/* CONTAINER */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
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

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
