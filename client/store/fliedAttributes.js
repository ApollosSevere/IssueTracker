import axios from "axios";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

/** ACTION TYPES */
const SET_FLIED_ATTRIBUTES = "SET_FLIED_ATTRIBUTES";

/** ACTION CREATORS */
const _setFields = (attributes) => ({
  type: SET_FLIED_ATTRIBUTES,
  payload: attributes,
});

/** THUNK CREATORS */
export const loadAttributes = () => async (dispatch) => {
  try {
    const { data: attributeData } = await axios.get("/api/tickets/attributes", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_setFields(attributeData));
  } catch (err) {
    return dispatch(_setProjects({ error: err }));
  }
};

/* REDUCER */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_FLIED_ATTRIBUTES:
      return action.payload;
    default:
      return state;
  }
}
