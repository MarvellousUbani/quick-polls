import { AuthedUserActionTypes } from "./authedUser.types";

const INITIAL_DATA = {
  currentUser: null,
};

const authedUser = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case AuthedUserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default authedUser;
