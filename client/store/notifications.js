import axios from "axios";

const TOKEN = "token";

/** ACTION TYPES */

const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

/** ACTION CREATORS */

const _setNotifications = (notifications) => ({
  type: SET_NOTIFICATIONS,
  payload: notifications,
});

/** THUNK CREATORS */

export const fetchNotifications = (userId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { data: notifications } = await axios.get(
      `/api/notifications/${userId}`,
      {
        headers: { authorization: token },
      }
    );
    dispatch(_setNotifications(notifications));
  } catch (error) {
    return dispatch(_setNotifications({ error: error }));
  }
};

export const addNotification = (updateObj) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const { projectName } = updateObj.updateObj;

    const { data: projectUsers } = await axios.get(
      `/api/users/assigned/${projectName}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    const users = projectUsers.users
      .filter(
        (user) =>
          user.roleName === "Project Manager" || user.roleName === "Master"
      )
      .map((user) => user.username);

    const notify = updateObj.updateObj.cardInfo
      ? [updateObj.updateObj.cardInfo.submitter_username]
      : users;

    const { data: notifications } = await axios.post(
      `/api/notifications`,
      { ...updateObj, usersToNotify: notify },
      {
        headers: { authorization: token },
      }
    );
    dispatch(_setNotifications(notifications));
  } catch (error) {
    return dispatch(_setNotifications({ error: error }));
  }
};

export const setNotification =
  (notificationId, updateObj) => async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      const { data: notifications } = await axios.put(
        `/api/notifications/${notificationId}`,
        updateObj,
        {
          headers: { authorization: token },
        }
      );
      dispatch(_setNotifications(notifications));
    } catch (error) {
      return dispatch(_setNotifications({ error: error }));
    }
  };

export const deleteNotification = (notificationId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);

    const { data: notifications } = await axios.delete(
      `/api/notifications/${notificationId}`,
      {
        headers: { authorization: token },
      }
    );

    dispatch(_setNotifications(notifications));
  } catch (error) {
    return dispatch(_setNotifications({ error: error }));
  }
};

export const notification_cleanup = () => async (dispatch) => {
  try {
    dispatch(_setNotifications([]));
  } catch (err) {
    return dispatch(_setNotifications({ error: err }));
  }
};

/* REDUCER */
export default function (state = [], action) {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.payload;
    default:
      return state;
  }
}
