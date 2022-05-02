import axios from "axios";

const TOKEN = "token";

const SET_USERS = "SET_USERS";

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const fetchProjectUsers = (projectId, setLoading) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);

    axios
      .get(`/api/users/assigned/${projectId}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        // setTimeout(() => {
        dispatch(setUsers(res.data));
        setLoading && setLoading(false);
        // }, 2000);
      })
      .catch((err) => dispatch(setUsers({ error: err })));
  };
};

export const deleteIssue = (issueId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);

    const { data: issue } = await axios.get(`/api/tickets/${issueId}`, {
      headers: {
        authorization: token,
      },
    });

    await axios.delete(`/api/tickets/${issueId}`, {
      headers: {
        authorization: token,
      },
    });

    dispatch(fetchProjectUsers(issue.projectName));
  } catch (err) {
    return dispatch(setUsers({ error: err }));
  }
};

export const project_cleanup = () => async (dispatch) => {
  try {
    dispatch(setUsers([]));
  } catch (err) {
    return dispatch(setUsers({ error: err }));
  }
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
