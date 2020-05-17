import React, {Component} from 'react';
import {connect} from 'react-redux';
import PollItem from '../poll-item/poll-item.component';
import CurrentUserInfo from '../current-user-info/current-user-info.component';
import {Link} from 'react-router-dom';

class Poll extends Component {
    render(){
        
       
        
        return(
            <div>
            <CurrentUserInfo />
            <div className="polls__list">
                <div className="row justify-center">
                    <button className="button__red">Answered Questions</button>
                    <button className="button__red">Unanswered Questions</button>
                </div>
                {
                    this.props.pollIds.map((id) =>  
                    <Link to={`/poll/${id}`}  key={id} >       
                        <PollItem id={id} hideQuestion/>
                    </Link>
                        
                )
                }

            </div> 
            </div>
        )
    }
}



function mapStateToProps({polls, authedUser, users}){
    return{
        pollIds: Object.keys(polls).sort((a, b) => polls[b].timestamp - polls[a].timestamp),
        currentUserInfo: users[authedUser.currentUser]
    }
}

export default connect(mapStateToProps)(Poll);

