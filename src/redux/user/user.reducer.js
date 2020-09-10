import { UserActionTypes } from "./user.types";

export default function users(state = {}, action) {
  switch (action.type) {
    case UserActionTypes.RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UserActionTypes.ADD_USER:
      return {
        ...state,
        [action.user.id]: action.user,
      };
    default:
      return state;
  }
}
