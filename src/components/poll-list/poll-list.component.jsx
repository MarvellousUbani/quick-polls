import React, { useState } from "react";
import { connect } from "react-redux";
import PollItem from "../poll-item/poll-item.component";
import CurrentUserInfo from "../current-user-info/current-user-info.component";
import { Link } from "react-router-dom";
import {
  selectPolls,
  selectNotAnsweredPolls,
  selectAnsweredPolls,
} from "../../redux/poll/poll.selectors";
import { selectCurrentUser } from "../../redux/authedUser/authedUser.selectors";
import { createStructuredSelector } from "reselect";

const Poll = ({ answered, notanswered, currentUser }) => {
  const [polls, setPolls] = useState(notanswered);

  const answeredPolls = (e) => {
    e.preventDefault();
    setPolls(answered);
  };

  const notansweredPolls = (e) => {
    e.preventDefault();
    setPolls(notanswered);
  };

  return (
    <div>
      <CurrentUserInfo />
      <div className="polls__list">
        <div className="row justify-center question--tab">
          <button className="button__red" onClick={answeredPolls}>
            Answered Question(s)
          </button>
          <button className="button__red" onClick={notansweredPolls}>
            Unanswered Question(s)
          </button>
        </div>
        {polls.map((poll) => (
          <Link to={`/poll/${poll.id}`} key={poll.id}>
            <PollItem poll={poll} currentUser={currentUser} hideQuestion />
          </Link>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  polls: selectPolls,
  notanswered: selectNotAnsweredPolls,
  answered: selectAnsweredPolls,
});

export default connect(mapStateToProps)(Poll);
