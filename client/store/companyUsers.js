import axios from "axios";

const TOKEN = "token";

/** ACTION TYPES */
const SET_COMPANY_USERS = "SET_COMPANY_USERS";

/** ACTION CREATORS */
const _setCompanyUsers = (company_users) => ({
  type: SET_COMPANY_USERS,
  payload: company_users,
});

/** THUNK CREATORS */
export const loadCompanyUsers = () => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: companyUsersData } = await axios.get("/api/users", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_setCompanyUsers(companyUsersData));
  } catch (err) {
    return dispatch(_setCompanyUsers({ error: err }));
  }
};

export const updateUserRole = (userId, updateObj) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: users } = await axios.put(
        `/api/users/${userId}`,
        updateObj,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_setCompanyUsers(users));
    } catch (error) {
      console.error(error);
    }
  };
};

/* REDUCER */
export default function (state = [], action) {
  switch (action.type) {
    case SET_COMPANY_USERS:
      return action.payload;
    default:
      return state;
  }
}
