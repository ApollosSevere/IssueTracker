import axios from "axios";

const TOKEN = "token";
const token = window.localStorage.getItem(TOKEN);

const initialState = {
  singleUserChore: {},
  allUsersChores: [],
};

/** ACTION TYPES */
const SET_SINGLE_USER_CHORE = "SET_SINGLE_USER_CHORE";

/** ACTION CREATORS */
const _setSingleChore = (chore) => ({
  type: SET_SINGLE_USER_CHORE,
  payload: chore,
});

/** THUNK CREATORS */
export const loadUserChores = (username) => async (dispatch) => {
  try {
    const { data: choresData } = await axios.get(
      `/api/chores/find/${username}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    dispatch(_setSingleChore(choresData));
  } catch (err) {
    return dispatch(_setSingleChore({ error: err }));
  }
};

export const chore_cleanup = () => async (dispatch) => {
  try {
    dispatch(_setSingleChore(initialState));
  } catch (err) {
    return dispatch(_setSingleChore({ error: err }));
  }
};

/* REDUCER */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_USER_CHORE:
      return { ...state, singleUserChore: action.payload };
    default:
      return state;
  }
}
