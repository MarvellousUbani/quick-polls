import React from 'react';
import {connect} from 'react-redux';
import {userCreatedPolls, userAnsweredPolls} from '../../utils/helpers';


const CurrentUserInfo = ({currentUserInfo, currentUserInfo:{avatarURL, name, id}, polls}) => (
    currentUserInfo && 
        <div className="text-center">
        <p><img className="profile__image" src={avatarURL} alt="Profile"/></p>
        <p><small>You are logged in as </small></p>
        <p className="current__user m-0">{name}</p>
        <p className="polls__number"><span className="polls__created">{userCreatedPolls(polls, id)} Polls Created</span><span className="polls__created">{userAnsweredPolls
        (polls, id)} Polls Joined</span></p>
    </div>
)

function mapStateToProps({authedUser, users, polls}){
    return{
        currentUserInfo: users[authedUser.currentUser],
        polls
    }
}

export default connect(mapStateToProps)(CurrentUserInfo);