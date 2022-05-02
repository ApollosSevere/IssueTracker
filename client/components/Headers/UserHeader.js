import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = ({ loggedInUser }) => {
  let user = loggedInUser;
  const history = useHistory();
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            loggedInUser.username === "Apollos"
              ? "url(" + "../../assets/img/theme/me4.jpeg" + ")"
              : "url(" + "../../assets/img/theme/profile-cover.jpg" + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-default opacity-8" />

        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">
                Hello {`${user.first_name ? user.first_name : user.username}`}
              </h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. With this application you can see the
                progress you've made with your work and manage your projects or
                assigned tasks
              </p>
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/");
                }}
              >
                Dashboard
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
