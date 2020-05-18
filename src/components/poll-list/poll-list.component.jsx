import React, {Component} from 'react';
import {connect} from 'react-redux';
import PollItem from '../poll-item/poll-item.component';
import CurrentUserInfo from '../current-user-info/current-user-info.component';
import {Link} from 'react-router-dom';
import {answered, notanswered} from '../../utils/helpers';

class Poll extends Component {

    state = {
        pollIds: notanswered(this.props.polls, this.props.currentUser)
    }

    answered = e => {
        e.preventDefault();
        const {currentUser, polls} = this.props;
        this.setState({
            pollIds: answered(polls, currentUser)
        })
    }

    notanswered = e => {
        e.preventDefault();
        const {currentUser, polls} = this.props;
        this.setState({
            pollIds: notanswered(polls, currentUser)
        })
    }

    render(){
        const {pollIds} = this.state;
        console.log(this.props.currentUser);
        return(
            <div>
            <CurrentUserInfo />
            <div className="polls__list">
                <div className="row justify-center question--tab">
                    <button className="button__red" onClick={this.answered}>Answered Questions</button>
                    <button className="button__red" onClick={this.notanswered}>Unanswered Questions</button>
                </div>
                {
                    pollIds.map((id) =>  
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
        currentUser: authedUser.currentUser,
        polls
    }
}

export default connect(mapStateToProps)(Poll);

