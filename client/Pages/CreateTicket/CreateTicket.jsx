import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";

// Redux Functions
import { addTicket } from "../../store/issue";
import { loadProjects } from "../../store/project";

// Components
import TagSelector from "../../components/utils/TagSelector.jsx";

export const CreateTicket = ({
  getProjects,
  submitTicket,
  username,
  types,
  projects,
}) => {
  const [projectPick, setProjectPick] = useState([]);
  const [typePick, setTypePick] = useState([]);
  const [formData, setFormData] = useState();
  const [posted, setPosted] = useState(false);

  const { projectId } = useParams();

  console.log(projectId, "id------");

  useEffect(() => {
    try {
      getProjects();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const projectPicked = projectPick.value;
      const typePicked = typePick.value;
      await submitTicket({
        ...formData,
        projectName: projectPicked,
        type: typePicked,
        submitter_username: username,
      });

      await getProjects();
      setPosted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <>
      {posted ? (
        <Redirect to={`/projectDetail/${projectId}`} />
      ) : (
        <div className="write">
          {projects ? (
            <>
              <div className="t-select">
                Project:{" "}
                <TagSelector
                  optionSelected={projectPick}
                  setSelected={setProjectPick}
                  option={"project"}
                  projects={projects}
                />
              </div>

              <div className="t-select">
                Type:{" "}
                <TagSelector
                  optionSelected={typePick}
                  setSelected={setTypePick}
                  option={"type"}
                  types={types}
                />
              </div>
            </>
          ) : (
            <>Loading...</>
          )}

          <form onSubmit={(event) => handleSubmit(event)} className="writeForm">
            <div className="writeFormGroup">
              <input
                className="writeInput"
                placeholder="Title"
                type="text"
                autoFocus={true}
                onChange={handleChange}
                name="title"
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                className="writeInput writeText"
                placeholder="Summary"
                type="text"
                onChange={handleChange}
                name="issue_summary"
              />
            </div>

            <div className="writeFormGroup">
              <textarea
                className="writeInput writeText"
                placeholder="Description"
                type="text"
                onChange={handleChange}
                name="issue_description"
              />
            </div>
            <button className="writeSubmit" type="submit">
              Publish
            </button>
          </form>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    projects: state.projects.projects || [],
    types: state.projects.typeValues || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitTicket: (ticketInfo) => dispatch(addTicket(ticketInfo)),
    getProjects: () => {
      dispatch(loadProjects());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);
