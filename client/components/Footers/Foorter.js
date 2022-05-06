import "./footer.css";
import React from "react";
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer style={{ padding: "20px 40px" }} className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              // href="https://www.creative-tim.com?ref=adr-admin-footer"
              rel="noopener noreferrer"
              target="_blank"
            >
              Apollos Severe
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.linkedin.com/in/apollos-severe/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i class="uil uil-linkedin"></i>
                Linkedin
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://github.com/ApollosSevere"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i class="uil uil-github"></i>
                Github
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.youtube.com/channel/UCnIgx66sV6TJQHsxpaeCK9w"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i class="uil uil-youtube"></i>
                YouTube
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
