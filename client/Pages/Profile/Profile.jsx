import React, { useEffect, useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";

// Redux Functions
import { updateUser, me } from "../../store";

// Components
import UserHeader from "../../components/Headers/UserHeader";

// Reactstrap
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  CardBody,
  Container,
  FormGroup,
  CardHeader,
} from "reactstrap";

const Profile = ({ loggedInUser, setUser, refreshUser }) => {
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState(loggedInUser);

  const handleChange = ({ target }) => {
    setUpdating(true);
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      setUser(formData);
      setUpdating(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      refreshUser();
      setFormData(loggedInUser);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <UserHeader loggedInUser={loggedInUser} />

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={
                          loggedInUser.image_location
                            ? loggedInUser.image_location
                            : loggedInUser.image
                        }
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardBody className="pt-9 pt-md-9">
                <div className="text-center">
                  <h3>
                    {`${
                      loggedInUser.first_name
                        ? loggedInUser.first_name + " " + loggedInUser.last_name
                        : loggedInUser.username
                    }`}
                    <span className="font-weight-light">, 22</span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {loggedInUser.city
                      ? loggedInUser.city + ", " + loggedInUser.country
                      : "San Jose, California"}
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {loggedInUser.roleName} - Company [XYZ]
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    {loggedInUser.about_me
                      ? loggedInUser.about_me
                      : "Full-stack Web Application Developer and Software Developer"}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {updating && (
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => handleSubmit(e)}
                        size="sm"
                      >
                        Update
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <h3>{loggedInUser.username}</h3>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Phone number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="(267) 743 - 9273"
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={formData.first_name}
                            id="input-first-name"
                            placeholder="First name"
                            onChange={handleChange}
                            name="first_name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            name="last_name"
                            onChange={handleChange}
                            value={formData.last_name}
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            name="address"
                            onChange={handleChange}
                            value={formData.address}
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            name="city"
                            onChange={handleChange}
                            value={formData.city}
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            name="country"
                            onChange={handleChange}
                            value={formData.country}
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            name="zipcode"
                            onChange={handleChange}
                            value={formData.zipcode}
                            placeholder="Postal code"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        name="about_me"
                        onChange={handleChange}
                        value={formData.about_me}
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => ({
  loggedInUser: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  refreshUser: () => dispatch(me()),
  setUser: (updatedObj) => dispatch(updateUser(updatedObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
