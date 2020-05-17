import {createSelector} from 'reselect';

const selectPollItems = state => state.polls;

export const selectPolls = createSelector(
    [selectPollItems],
    polls => polls.item
);