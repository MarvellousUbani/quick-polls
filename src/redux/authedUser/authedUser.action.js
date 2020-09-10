import { AuthedUserActionTypes } from "./authedUser.types";

export const setCurrentUser = (user) => ({
  type: AuthedUserActionTypes.SET_CURRENT_USER,
  payload: user,
});
