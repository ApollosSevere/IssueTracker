import axios from "axios";

const TOKEN = "token";

/** ACTION TYPES */
const SET_HISTORY = "SET_HISTORY";

/** ACTION CREATORS */
const _setHistory = (history) => ({
  type: SET_HISTORY,
  payload: history,
});

/** THUNK CREATORS */
export const fetchHistory = (ticketId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: history } = await axios.get(`/api/history/${ticketId}`, {
      headers: { authorization: token },
    });
    dispatch(_setHistory(history));
  } catch (error) {
    return dispatch(setAuth({ error: error }));
  }
};

export const history_cleanup = () => async (dispatch) => {
  try {
    dispatch(_setHistory([]));
  } catch (err) {
    return dispatch(_setHistory({ error: err }));
  }
};

/* REDUCER */
export default function (state = [], action) {
  switch (action.type) {
    case SET_HISTORY:
      return action.payload;
    default:
      return state;
  }
}
