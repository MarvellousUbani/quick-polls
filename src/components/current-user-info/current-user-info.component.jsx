import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAnsweredPolls,
  selectCreatedPolls,
} from "../../redux/poll/poll.selectors";
import { selectCurrentUserInfo } from "../../redux/authedUser/authedUser.selectors";

const CurrentUserInfo = ({
  currentUser,
  currentUser: { avatarURL, name, id },
  createdPolls,
  answeredPolls,
}) => {
  console.log(currentUser);
  return (
    <div className="text-center">
      <p>
        <img className="profile__image" src={avatarURL} alt="Profile" />
      </p>
      <p>
        <small>You are logged in as </small>
      </p>
      <p className="current__user m-0">{name}</p>
      <p className="polls__number">
        <span className="polls__created">
          {createdPolls.length} Polls Created
        </span>
        <span className="polls__created">
          {answeredPolls.length} Polls Joined
        </span>
      </p>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUserInfo,
  answeredPolls: selectAnsweredPolls,
  createdPolls: selectCreatedPolls,
});

export default connect(mapStateToProps)(CurrentUserInfo);
