import axios from "axios";

const TOKEN = "token";

/** ACTION TYPES */

const SET_TICKET = "SET_TICKET";

/** ACTION CREATORS */

const _setTicket = (ticket) => ({
  type: SET_TICKET,
  payload: ticket,
});

/** THUNK CREATORS */

export const fetchTicket = (ticketId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: ticket } = await axios.get(`/api/tickets/${ticketId}`, {
      headers: { authorization: token },
    });
    dispatch(_setTicket(ticket));
  } catch (error) {
    return dispatch(_setTicket({ error: error }));
  }
};

export const manageTicket =
  (ticketId, updatedObj, userType) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: updatedTicket } = await axios.put(
        `/api/tickets/${userType}/${ticketId}`,
        updatedObj,
        {
          headers: { authorization: token },
        }
      );
      dispatch(_setTicket(updatedTicket));
    } catch (error) {
      return dispatch(_setTicket({ error: error }));
    }
  };

export const addTicket = (ticketInfo) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: ticket } = await axios.post(`/api/tickets`, ticketInfo, {
      headers: { authorization: token },
    });
    return ticket;
  } catch (error) {
    return dispatch(_setTicket({ error: error }));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: updatedTicket } = await axios.delete(
      `/api/tickets/comment/${commentId}`,
      {
        headers: { authorization: token },
      }
    );
    dispatch(_setTicket(updatedTicket));
  } catch (error) {
    return dispatch(_setTicket({ error: error }));
  }
};

export const addComment = (commentInfo) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    await axios.post(`/api/tickets/addcomment`, commentInfo, {
      headers: { authorization: token },
    });
  } catch (error) {
    return dispatch(_setTicket({ error: error }));
  }
};

export const updateIssueStatus = (ticketId, newStatus) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: updatedTicket } = await axios.put(
      `/api/tickets/owner/${ticketId}`,
      newStatus,
      {
        headers: { authorization: token },
      }
    );
    return updatedTicket;
  } catch (error) {
    return dispatch(_setTicket({ error: error }));
  }
};

/* REDUCER */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_TICKET:
      return action.payload;
    default:
      return state;
  }
}
