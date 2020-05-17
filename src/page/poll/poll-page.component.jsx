import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PollItem from '../../components/poll-item/poll-item.component'
import CurrentUserInfo from '../../components/current-user-info/current-user-info.component';
import {isAnsweredPoll, answerPercentage} from '../../utils/helpers';



class PollPage extends Component{
    render(){
        
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

    return {
    id,
    poll: polls[id],
    polls,
    authedUser,
    }
}

export default connect(mapStateToProps)(PollPage)