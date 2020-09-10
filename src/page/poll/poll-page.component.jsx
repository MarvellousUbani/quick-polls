import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import PollItem from "../../components/poll-item/poll-item.component";
import CurrentUserInfo from "../../components/current-user-info/current-user-info.component";

import { selectCurrentUser } from "../../redux/authedUser/authedUser.selectors";
import {
  isAnsweredByCurrentUser,
  selectCurrentPoll,
  selectIsIdValid,
} from "../../redux/poll/poll.selectors";

import { mappable } from "../../utils/helpers";

const PollPage = ({ id, idValid, currentUser, poll, isAnswered }) => {
  if (!idValid) {
    return <Redirect to="/404" />;
  }

  const pollsize = mappable(poll.users_answered).length;
  return (
    <div>
      <CurrentUserInfo />

      {isAnswered ? (
        <div className="results">
          <h4 className="text-center my-4">{poll.question}</h4>

          {mappable(poll.answers).map((answer) => (
            <div key={answer.name} className="poll poll__result">
              <p className="row j-between">
                <span className="answer">{answer.name} </span>
                <span className="percentage">
                  {(answer.number / pollsize) * 100}%
                </span>
              </p>
              <div className="bar-holder">
                <div
                  className="bar-line"
                  style={{ width: `${(answer.number / pollsize) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
          <p className="text-center my-4">
            <small>
              You answered{" "}
              <span className="user-answer">
                {poll.users_answered[currentUser].answer}
              </span>
            </small>
          </p>
        </div>
      ) : (
        <PollItem key={id} id={id} poll={poll} currentUser={currentUser} />
      )}

      <p className="text-center my-4">
        <Link to="/polls" className="button__red">
          See Other Polls
        </Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    currentUser: selectCurrentUser(state),
    id,
    isAnswered: isAnsweredByCurrentUser(id)(state),
    poll: selectCurrentPoll(id)(state),
    idValid: selectIsIdValid(id)(state),
  };
};

export default connect(mapStateToProps)(PollPage);
