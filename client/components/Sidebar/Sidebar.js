import React, { useState, useEffect } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";

// Redux Functions
import {
  fetchNotifications,
  notification_cleanup,
} from "../../store/notifications";

import { logout } from "../../store/auth.js";

// Components
import Notifications from "../Notifications/Notifications.jsx";

// Reactstrap
import {
  Row,
  Col,
  Nav,
  Form,
  Input,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Collapse,
  Container,
  InputGroup,
  NavbarBrand,
  DropdownItem,
  DropdownMenu,
  InputGroupText,
  DropdownToggle,
  InputGroupAddon,
  UncontrolledDropdown,
} from "reactstrap";

const Sidebar = (props) => {
  const {
    getNotifications,
    notificationCleanup,
    handleClick,
    loggedInUser,
    userNotifications,
  } = props;
  const [notifications, setNotifications] = useState([]);
  const [collapseOpen, setCollapseOpen] = useState();

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/main" && prop.display) {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              onClick={closeCollapse}
              activeClassName="active"
            >
              <i className={prop.icon} />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      }
    });
  };

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

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}

        <Nav className="align-items-center d-flex d-md-none nav justify-content-center">
          <Notifications notifications={notifications} colorStyle={"black"} />

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
        </Nav>

        <Collapse navbar isOpen={collapseOpen}>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>

          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>

          <Nav navbar>{createLinks(routes(props.loggedInUser))}</Nav>

          <hr className="my-3" />

          <h6 className="navbar-heading text-muted">Documentation</h6>

          <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
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

export default connect(mapStateToProps, mapDispatch)(Sidebar);