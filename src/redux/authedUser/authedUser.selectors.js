import { createSelector } from "reselect";
import { selectUsers } from "../user/user.selectors";

const selectUser = (state) => state.authedUser;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentUserInfo = createSelector(
  [selectCurrentUser, selectUsers],
  (user, users) => users[user]
);
