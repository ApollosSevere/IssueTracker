import React from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

// Components
import routes from "../Routes";
import Header from "../components/Headers/Header";
import Footer from "../components/Footers/Foorter";
import Sidebar from "../components/Sidebar/Sidebar.js";
import AdminNavbar from "../components/Navbars/AdminNavbar";

// Reactstrap
import { Container } from "reactstrap";

const Main = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/main") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: "../favicon.ico",
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />

        <Header />
        <div
          // style={{ height: }}
          className="content"
        >
          <Switch>
            {getRoutes(routes(props.loggedInUser))}
            <Redirect from="*" to="/main/dashboard" />
          </Switch>
        </div>
        <Container>
          <Footer />
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth,
  };
};

export default connect(mapStateToProps)(Main);
