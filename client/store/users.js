import axios from "axios";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

const SET_USERS = "SET_USERS";

const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const fetchProjectUsers = (projectId, userId) => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get(
        `/api/users/assigned/${projectId}`,
        { userId },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(setUsers(users));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
