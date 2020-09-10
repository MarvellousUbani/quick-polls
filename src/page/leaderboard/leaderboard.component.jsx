import React from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import {
  selectCreatedPolls,
  selectAnsweredPolls,
  selectPolls,
} from "../../redux/poll/poll.selectors";
import { selectCurrentUserInfo } from "../../redux/authedUser/authedUser.selectors";
import { selectUsers } from "../../redux/user/user.selectors";

import { sortedUserLeaderboard, mappable } from "../../utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeaderBoardPage = ({
  users,
  createdPolls,
  answeredPolls,
  polls,
  currentUser: { name, id, avatarURL },
}) => {
  const leaderboardList = sortedUserLeaderboard(polls, users);
  return (
    <div className="leaderboard">
      <h2 className="text-center">Leaderboard</h2>
      <div className="leaderboard__currentuser row">
        <div className="col text-center">
          <p>
            <img className="profile__image" src={avatarURL} alt="Profile" />
          </p>
          <p className="leaderboard__current__user--name">{name}</p>
        </div>
        <div className="col text-center leaderboard__currentuser--rank">
          SCORE
          <br />
          <span className="rank">
            {mappable(createdPolls).length + mappable(answeredPolls).length}
          </span>
        </div>
      </div>
      {leaderboardList.map((user) => (
        <div className="leaderboard__people" key={user.name}>
          <div className="row leaderboard__person">
            <div className="col person--info">
              <img
                className="profile__image"
                src={user.avatarURL}
                alt="Profile"
              />{" "}
              <span className="leaderboard__person--name">{user.fullname}</span>
            </div>
            <div className="col person--score">
              <span className="created-polls">
                Created Polls:{user.createdPolls}
              </span>
              <span className="answered-polls">
                Answered Polls: {user.answeredPolls}
              </span>
              <span className="totalscore">Total score: {user.total}</span>
              <FontAwesomeIcon icon="medal" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  createdPolls: selectCreatedPolls,
  answeredPolls: selectAnsweredPolls,
  currentUser: selectCurrentUserInfo,
  polls: selectPolls,
  users: selectUsers,
});

export default connect(mapStateToProps)(LeaderBoardPage);
