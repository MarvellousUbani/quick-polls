import {createSelector} from 'reselect';

const selectUser = state => state.authedUser;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);