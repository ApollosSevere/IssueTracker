import React from "react";
import "./authForm.css";

// Modules/Libraries
import { connect } from "react-redux";

// Redux
import { authenticate } from "../../store";

import {
  Col,
  Row,
  Card,
  Form,
  Input,
  Button,
  CardBody,
  FormGroup,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";

function LoginForm({ name, handleSubmit, error }) {
  return (
    <>
      <Col style={{ marginBottom: "30px" }} lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody>
            <div id="big-title" class="col-md-12">
              <h1>Bug Tracker</h1>
              <h2>A complete solution to track errors in software</h2>
              <h4>
                <a href="/auth/about">Read more about Bug Tracker</a>
              </h4>

              <div id="plug-portfolio" class="jumbotron">
                <h4>
                  A project by Apollos Severe
                  <br />
                  <a
                    href="https://apollos-portfolio.herokuapp.com/"
                    target="_blank"
                  >
                    View full portfolio
                  </a>
                </h4>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col style={{ height: "64vh" }} lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign In with credentials</small>
            </div>
            <Form onSubmit={handleSubmit} name={name} role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="username"
                    type="text"
                    autoComplete="new-email"
                    name="username"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                  />
                </InputGroup>
              </FormGroup>

              {error && error.response && <div> {error.response.data} </div>}
              <div className="text-center">
                <Button type="submit" className="my-4" color="primary">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

function SignupForm({ name, handleSubmit, error, liveDemo }) {
  return (
    <>
      <Col style={{ marginBottom: "30px" }} lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody>
            <div id="big-title" class="col-md-12">
              <h1>Bug Tracker</h1>
              <h2>A complete solution to track errors in software</h2>
              <h4>
                <a href="/auth/about">Read more about Bug Tracker</a>
              </h4>

              <div id="plug-portfolio" class="jumbotron">
                <h4>
                  A project by Apollos Severe
                  <br />
                  <a
                    href="https://apollos-portfolio.herokuapp.com/"
                    target="_blank"
                  >
                    View full portfolio
                  </a>
                </h4>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2">
              <small>Sign In with Live Demos</small>
            </div>
            <Row>
              <Col className="xl-6 btn-container">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => liveDemo("Admin (Demo)", "123", "Login")}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src="../../assets/img/theme/adminPhoto.jpeg"
                    />
                  </span>
                  <span className="btn-inner--text">Admin</span>
                </Button>
              </Col>

              <Col className="xl-6 btn-container">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) =>
                    liveDemo("Project Manager (Demo)", "123", "Login")
                  }
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src="../../assets/img/theme/managerPhoto.png"
                    />
                  </span>
                  <span className="btn-inner--text">Manager</span>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col className="xl-6 btn-container">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => liveDemo("Developer (Demo)", "123", "Login")}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src="../../assets/img/theme/developerPhoto.png"
                    />
                  </span>
                  <span className="btn-inner--text">Developer</span>
                </Button>
              </Col>

              <Col className="xl-6 btn-container">
                {/* <p>Sign in as </p> */}
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => liveDemo("Submitter (Demo)", "123", "Login")}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src="../../assets/img/theme/submitterPhoto.png"
                    />
                  </span>
                  <span className="btn-inner--text">Submitter</span>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col className="xl-12 btn-container">
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={(e) => liveDemo("Master (Demo)", "123", "Login")}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src="../../assets/img/theme/masterPhoto.png"
                    />
                  </span>
                  <span className="btn-inner--text"> Master</span>
                </Button>
              </Col>
            </Row>
          </CardHeader>

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or Sign Up with credentials</small>
            </div>
            <Form name={name} onSubmit={handleSubmit} role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Username" type="text" name="username" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                  />
                </InputGroup>
              </FormGroup>
              {error && error.response && <div> {error.response.data} </div>}

              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      console.log(formName, username, password);
      dispatch(authenticate(username, password, formName));
    },
    liveDemo: (username, password, formName) =>
      dispatch(authenticate(username, password, formName)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
export const Signup = connect(mapSignup, mapDispatch)(SignupForm);
