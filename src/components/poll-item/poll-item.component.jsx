import React from "react";

import { connect } from "react-redux";

import { formatDate } from "../../utils/helpers";
import { handleUpdatePoll } from "../../redux/poll/poll.action";

import { mappable } from "../../utils/helpers";

const PollItem = ({ updatePoll, poll, hideQuestion, currentUser, id }) => {
  if (!poll) {
    return <p>This poll does not exist </p>;
  }

  const { author, question, timestamp, users_answered, answers } = poll;

  return (
    <div className="poll">
      <span className="poll__author">{author.toUpperCase()} asks</span>
      <p className="poll__question">{question}</p>
      <small>{formatDate(timestamp)}</small>
      <span className="poll__votes">
        {mappable(users_answered).length} vote(s)
      </span>

      <div className={`${hideQuestion ? "d-none" : ""} poll__form`}>
        {mappable(answers).map((answer) => (
          <button
            key={answer.name}
            className="button__red"
            onClick={() =>
              updatePoll({ id, authedUser: currentUser, answer: answer.name })
            }
          >
            {answer.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updatePoll: (data) => dispatch(handleUpdatePoll(data)),
});

export default connect(null, mapDispatchToProps)(PollItem);
