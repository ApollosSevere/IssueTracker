import axios from "axios";

const TOKEN = "token";

/** ACTION TYPES */

const SET_MY_TICKETS = "SET_MY_TICKETS";

/** ACTION CREATORS */

const _setMyTickets = (myTickets) => ({
  type: SET_MY_TICKETS,
  payload: myTickets,
});

/** THUNK CREATORS */

export const fetchMyTickets = (userId, setLoading) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);

  axios
    .get(`/api/tickets/myTickets/${userId}`, {
      headers: { authorization: token },
    })
    .then((res) => {
      // setTimeout(() => {
      dispatch(_setMyTickets(res.data));
      setLoading && setLoading(false);
      return res.data;
      // }, 2000);
    })
    .catch((err) => dispatch(_setMyTickets({ error: err })));
};

export const setMyTickets = (ticketId, updateObj) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    const { data: myTickets } = await axios.put(
      `/api/tickets/myTickets/${ticketId}`,
      updateObj,
      {
        headers: { authorization: token },
      }
    );
    dispatch(_setMyTickets(myTickets));
  } catch (error) {
    return dispatch(_setMyTickets({ error: error }));
  }
};

export const deleteTicket = (ticketId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);

    const { data: myTickets } = await axios.delete(
      `/api/tickets/myTickets/${ticketId}`,
      {
        headers: { authorization: token },
      }
    );

    dispatch(_setMyTickets(myTickets));
  } catch (error) {
    return dispatch(_setMyTickets({ error: error }));
  }
};

export const myTickets_cleanup = () => async (dispatch) => {
  try {
    dispatch(_setMyTickets([]));
  } catch (err) {
    return dispatch(_setMyTickets({ error: err }));
  }
};

/* REDUCER */
export default function (state = [], action) {
  switch (action.type) {
    case SET_MY_TICKETS:
      return action.payload;
    default:
      return state;
  }
}
