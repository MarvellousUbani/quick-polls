import { PollActionTypes } from "./poll.types";
import { updateAnswer, updateUsersAnswered } from "./poll.utils";

const polls = (state = {}, action) => {
  switch (action.type) {
    case PollActionTypes.RECEIVE_POLLS:
      return {
        ...state,
        ...action.polls,
      };
    case PollActionTypes.ADD_POLL:
      return {
        ...state,
        [action.poll.id]: action.poll,
      };
    case PollActionTypes.UPDATE_POLL:
      const pollData = state[action.id];
      console.log(pollData.answers);
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          answers: updateAnswer(pollData.answers, action.answer),
          users_answered: updateUsersAnswered(
            pollData.users_answered,
            action.authedUser,
            action.answer
          ),
        },
      };

    default:
      return state;
  }
};

export default polls;
