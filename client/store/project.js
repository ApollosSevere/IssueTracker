import axios from "axios";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

/** ACTION TYPES */
const SET_PROJECTS = "SET_PROJECTS";

/** ACTION CREATORS */
const _setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects,
});

/** THUNK CREATORS */
export const loadProjects = () => async (dispatch) => {
  try {
    const { data: projectsData } = await axios.get("/api/projects", {
      headers: {
        authorization: token,
      },
    });
    console.log(projectsData);
    dispatch(_setProjects(projectsData));
  } catch (err) {
    return dispatch(_setProjects({ error: err }));
  }
};

/* REDUCER */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload;
    default:
      return state;
  }
}
