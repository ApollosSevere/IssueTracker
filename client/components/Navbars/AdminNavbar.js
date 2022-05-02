import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux Functions
import {
  fetchNotifications,
  notification_cleanup,
} from "../../store/notifications";
import { logout } from "../../store";

// Components
import Notifications from "../Notifications/Notifications.jsx";

// Reactstrap
import {
  Nav,
  Media,
  Navbar,
  Container,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const AdminNavbar = ({
  brandText,
  handleClick,
  loggedInUser,
  getNotifications,
  userNotifications,
  notificationCleanup,
}) => {
  const [notifications, setNotifications] = useState([]);
  const shouldShow = window.innerWidth < 770 ? "none" : "inline";

  useEffect(() => {
    try {
      getNotifications(loggedInUser.username);
    } catch (error) {
      console.log(error);
    }
    return () => {
      notificationCleanup();
    };
  }, [loggedInUser]);

  useEffect(() => {
    try {
      setNotifications(userNotifications);
    } catch (error) {
      console.log(error);
    }
  }, [userNotifications]);

  return (
    <>
      <Navbar
        style={{ display: shouldShow }}
        className="navbar-top navbar-dark"
        expand="md"
        id="navbar-main"
      >
        <Container fluid>
          <div className="h4 mb-0 text-white text-uppercase  d-lg-inline-block">
            {brandText}
          </div>

          <Nav className="align-items-center d-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center d-flex">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        loggedInUser.image_location
                          ? loggedInUser.image_location
                          : loggedInUser.image
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {loggedInUser.username}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/main/profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={handleClick}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem href="#pablo">
                  <Media className="align-items-center">
                    <a
                      className="avatar rounded-circle mr-3 avatar-sm "
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={"../../assets/img/theme/apollo_headshot.jpeg"}
                      />
                    </a>
                    <Media>
                      <span className="mb-0 text-sm">
                        Learn more about Apollos
                      </span>
                    </Media>
                  </Media>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Notifications notifications={notifications} />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth,
    userNotifications: state.notifications,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick: () => dispatch(logout()),
    notificationCleanup: () => dispatch(notification_cleanup()),
    getNotifications: (userId) => dispatch(fetchNotifications(userId)),
  };
};

export default connect(mapStateToProps, mapDispatch)(AdminNavbar);
