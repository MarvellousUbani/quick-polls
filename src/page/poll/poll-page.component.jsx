import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PollItem from '../../components/poll-item/poll-item.component'
import CurrentUserInfo from '../../components/current-user-info/current-user-info.component';
import {isAnsweredPoll, answerPercentage, currentUserAnswer} from '../../utils/helpers';



class PollPage extends Component{
    render(){
        if (this.props.idValid) {
            return <Redirect to="/404" />;
        }
        
        const {id, authedUser, polls, poll:{answers, question, users_answered}} = this.props;
        const firstPercentage = answerPercentage(polls, id, answers[0]);
        const secondPercentage = answerPercentage(polls, id , answers[1]);

        return(
            <div>      
                <CurrentUserInfo />
                           
            { isAnsweredPoll(polls, id, authedUser) ?
             <div className ="results">
                 <h4 className="text-center my-4">{question}</h4>
                <div className="poll poll__result">
                    <p className="row j-between"><span className="answer">{answers[0]}</span> <span className="percentage">{firstPercentage}%</span></p>
                    <div className="bar-holder">
                        <div className="bar-line" style={{width:`${firstPercentage}%`}}></div>
                    </div>
                    <span className="poll__votes">{users_answered.length} votes</span>
                </div>

                <div className="poll poll__result">
            <p className="row j-between"><span className="answer">{answers[1]}</span> <span className="percentage">{secondPercentage}%</span></p>
                    <div className="bar-holder">
                        <div className="bar-line" style={{width:`${secondPercentage}%`}}></div>
                    </div>
                </div>
                <p className="text-center my-4"><small>You answered <span className="user-answer">{currentUserAnswer(polls[id], authedUser)}</span></small></p>
            </div> 
                :<PollItem id={id}/>
            }
            
            <p className="text-center my-4"><Link to="/polls" className="button__red">See Other Polls</Link></p>
                
             </div>
        )
    }
}

function mapStateToProps ({polls, authedUser}, props) { 
    const { id } = props.match.params
    const idValid = !polls[id];

    return {
    id,
    poll: polls[id],
    polls,
    authedUser,
    idValid
    }
}

export default connect(mapStateToProps)(PollPage)