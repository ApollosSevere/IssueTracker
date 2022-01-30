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

export const getProjects = (prarm) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/auth/${method}`,
      { username, password },
      { headers: { authorization: token } }
    );
    dispatch(setAuth({ error: authError }));
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

/* REDUCER */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.payload;
    default:
      return state;
  }
}
