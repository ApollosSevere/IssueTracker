import axios from "axios";

const TOKEN = "token";

/** ACTION TYPES */
const SET_TICKETS = "SET_TICKETS";

/** ACTION CREATORS */
const _setTickets = (tickets) => ({
  type: SET_TICKETS,
  payload: tickets,
});

/** THUNK CREATORS */
export const loadTickets = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: tickets } = await axios.get("/api/tickets", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_setTickets(tickets));
  } catch (err) {
    return dispatch(_setTickets({ error: err }));
  }
};

/* REDUCER */
export default function (state = [], action) {
  switch (action.type) {
    case SET_TICKETS:
      return action.payload;
    default:
      return state;
  }
}
