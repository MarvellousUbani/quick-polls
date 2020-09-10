import { createSelector } from "reselect";
import { selectCurrentUser } from "../authedUser/authedUser.selectors";

const selectPollItems = (state) => state.polls;

export const selectPolls = createSelector([selectPollItems], (polls) =>
  polls ? Object.values(polls).sort((a, b) => b.timestamp - a.timestamp) : []
);

export const selectAnsweredPolls = createSelector(
  [selectPolls, selectCurrentUser],
  (polls, user) =>
    polls ? polls.filter((poll) => poll.users_answered[user]) : []
);

export const selectNotAnsweredPolls = createSelector(
  [selectPolls, selectCurrentUser],
  (polls, user) =>
    polls ? polls.filter((poll) => poll.users_answered[user] === undefined) : []
);

export const selectCreatedPolls = createSelector(
  [selectPolls, selectCurrentUser],
  (polls, user) => (polls ? polls.filter((poll) => poll.author === user) : [])
);

export const selectCurrentPoll = (id) => {
  return createSelector([selectPolls], (polls) =>
    polls.find((poll) => poll.id === id)
  );
};

export const selectIsIdValid = (id) => {
  return createSelector([selectPolls], (polls) =>
    polls.some((poll) => poll.id === id)
  );
};

export const isAnsweredByCurrentUser = (id) => {
  return createSelector([selectAnsweredPolls], (polls) =>
    polls.some((poll) => poll.id === id)
  );
};
