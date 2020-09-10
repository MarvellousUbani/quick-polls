import { PollActionTypes } from "./poll.types";
import { updatePoll, savePoll } from "../../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export default function receivePolls(polls) {
  return {
    type: PollActionTypes.RECEIVE_POLLS,
    polls,
  };
}

function addPoll(poll) {
  return {
    type: PollActionTypes.ADD_POLL,
    poll,
  };
}

function updatePollResult({ id, authedUser, answer }) {
  return {
    type: PollActionTypes.UPDATE_POLL,
    id,
    authedUser,
    answer,
  };
}

export function handleAddPoll({
  question,
  authedUser,
  answers,
  id,
  users_answered = {},
}) {
  return (dispatch) => {
    dispatch(showLoading());
    return savePoll({
      question,
      author: authedUser,
      answers,
      id,
      users_answered,
    })
      .then((poll) => dispatch(addPoll(poll)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleUpdatePoll(info) {
  return (dispatch) => {
    dispatch(updatePollResult(info));

    return updatePoll(info).catch((e) => {
      console.log("Error in updatingPoll", e);
      dispatch(updatePollResult(info));
      alert("There was an error updating the poll. Try again.");
    });
  };
}
