import { createSelector } from "reselect";

const selectUserItems = (state) => state.users;

export const selectUsers = createSelector([selectUserItems], (users) => users);
