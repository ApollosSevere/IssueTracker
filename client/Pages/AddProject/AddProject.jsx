import "./addProject.css";
import React, { useState } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

// Redux Functions
import { me } from "../../store";
import { addNewProject, updateProject } from "../../store/project";

// Reactstrap
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Button,
  CardBody,
  FormGroup,
  Container,
  CardHeader,
} from "reactstrap";

const AddProject = ({ addProject, projects, editProject }) => {
  const { projectId } = useParams();

  const project_info =
    projectId && projects.filter((project) => project.name === projectId);

  const [formData, setFormData] = useState(
    projectId ? project_info[0] : { name: "", project_desc: "" }
  );
  const [startDate, setStartDate] = useState(
    projectId ? new Date(formData.start_date) : new Date()
  );
  const [targetEndDate, setTargetEndDate] = useState(
    projectId ? new Date(formData.target_end_date) : new Date()
  );

  const [img] = useState(
    `https://picsum.photos/200/300?random=${Math.floor(
      Math.random() * (10000000 - 1) + 1
    )}`
  );

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (projectId) {
        editProject(projectId, {
          ...formData,
          start_date: startDate,
          target_end_date: targetEndDate,
          //   image: img, Later if they decide to update photo
        });
      } else {
        addProject({
          ...formData,
          start_date: startDate,
          target_end_date: targetEndDate,
          image: img,
        });
      }

      history.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt--7">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col className="order-xl-1" xl="10">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => handleSubmit(e)}
                      size="sm"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Project information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Project Name
                          </label>
                          {projectId && <h2>{formData.name || ""}</h2>}
                          {!projectId && (
                            <Input
                              className="form-control-alternative"
                              value={formData.name || ""}
                              id="input-username"
                              placeholder="Project Name"
                              type="text"
                              name="name"
                              onChange={handleChange}
                            />
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Start Date
                          </label>

                          <div className="date-input">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Target End date
                          </label>
                          <div className="date-input">
                            <DatePicker
                              selected={targetEndDate}
                              onChange={(date) => setTargetEndDate(date)}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">
                    Project Description
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Project Description</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="Take a moment to give a project description"
                        rows="4"
                        name="project_desc"
                        onChange={handleChange}
                        value={formData.project_desc || ""}
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
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => ({
  refreshUser: () => dispatch(me()),
  editProject: (projectId, updatedObj) =>
    dispatch(updateProject(projectId, updatedObj)),
  addProject: (updatedObj) => dispatch(addNewProject(updatedObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
