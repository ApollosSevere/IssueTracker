import axios from "axios";

const TOKEN = "token";

/** ACTION TYPES */
const SET_PROJECTS = "SET_PROJECTS";

/** ACTION CREATORS */
const _setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

/** THUNK CREATORS */
export const loadProjects = (setLoading) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);

  axios
    .get("/api/projects", {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      // setTimeout(() => {
      dispatch(_setProjects(res.data));
      setLoading(false);
      // }, 2000);
    })
    .catch((err) => dispatch(_setProjects({ error: err })));
};

export const manageProject =
  (projectId, updatedObj, userType) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: completed } = await axios.put(
        `/api/projects/${userType}/${projectId}`,
        updatedObj,
        {
          headers: { authorization: token },
        }
      );
      dispatch(_setProjects(completed));
    } catch (error) {
      return dispatch(_setProjects({ error: error }));
    }
  };

export const addNewProject = (projectObj) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: projectsData } = await axios.post(
      "/api/projects",
      projectObj,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_setProjects(projectsData));
  } catch (err) {
    return dispatch(_setProjects({ error: err }));
  }
};

export const updateProject = (projectId, updateObj) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);

    const { data: projectsData } = await axios.post(
      `/api/projects/${projectId}`,
      updateObj,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_setProjects(projectsData));
  } catch (err) {
    return dispatch(_setProjects({ error: err }));
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);

    const { data: projectsData } = await axios.delete(
      `/api/projects/${projectId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_setProjects(projectsData));
  } catch (err) {
    return dispatch(_setProjects({ error: err }));
  }
};

/* REDUCER */
export default function (state = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload;
    default:
      return state;
  }
}
