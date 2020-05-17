import React, {Component} from 'react';
import {connect} from 'react-redux';
import {totalUserPolls, sortedUserLeaderboard} from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LeaderBoardPage extends Component{
    render(){
        const {users, polls, authedUser:{name, id, avatarURL}} = this.props;
        const leaderboardList = sortedUserLeaderboard(polls, users);
        return(
           
            <div className="leaderboard">
                <h2 className="text-center">Leaderboard</h2>
                  <div className="leaderboard__currentuser row">
                     
                      <div className="col text-center">
                          <p><img className="profile__image" src={avatarURL} alt="Profile"/></p>
                           <p className="leaderboard__current__user--name">{name}</p>
                      </div>
                       <div className="col text-center leaderboard__currentuser--rank">
                          SCORE<br/>
                          <span className="rank">{totalUserPolls(polls, id)}</span>
                      </div>
      
                  </div>
                  {leaderboardList.map(user => 
                     <div className="leaderboard__people" key={user.name}>
                     <div className="row leaderboard__person">
                         <div className="col person--info"><img className="profile__image" src={user.avatarURL} alt="Profile"/> <span className="leaderboard__person--name">{user.fullname}</span></div>
                         <div className="col person--score">
                             <span className="created-polls">Created Polls:{user.createdPolls}</span>
                                <span className="answered-polls">Answered Polls: {user.answeredPolls}</span>
                                <span className="totalscore">Total score: {user.total}</span>
                                <FontAwesomeIcon icon="medal"/>
                            </div>
                        </div>
                    </div>
                    )}
                  
                </div>
        )
    }
}

function mapStateToProps({authedUser, polls, users}){
 return{
     users,
     polls,
     authedUser: users[authedUser.currentUser]
 }
}

export default connect(mapStateToProps)(LeaderBoardPage);
