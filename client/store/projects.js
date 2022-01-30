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
export const getProjects = () => async (dispatch) => {
  try {
    const { data: projects } = await axios.get("/api/projects", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_setProjects(projects));
  } catch (err) {
    return dispatch(setAuth({ error: err }));
  }
};

/* REDUCER */
export function projectReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload;
    default:
      return state;
  }
}
