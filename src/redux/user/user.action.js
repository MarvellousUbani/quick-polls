import { UserActionTypes } from "./user.types";
import { showLoading, hideLoading } from "react-redux-loading";
import { saveUser } from "../../utils/api";

export function receiveUsers(users) {
  return {
    type: UserActionTypes.RECEIVE_USERS,
    users,
  };
}

function addUser(user) {
  return {
    type: UserActionTypes.ADD_USER,
    user,
  };
}

export function handleAddUser({ id, name, avatarURL, password }) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveUser({
      id,
      name,
      avatarURL,
      password,
    })
      .then((user) => dispatch(addUser(user)))
      .then(() => dispatch(hideLoading()));
  };
}
