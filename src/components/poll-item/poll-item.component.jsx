import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../../utils/helpers';
import {handleUpdatePoll} from '../../redux/poll/poll.action';

import {withRouter } from 'react-router-dom'

class PollItem extends Component{

    updatePoll = (e) => {
        const {dispatch, poll:{id}, authedUser} = this.props;
        const answer = e.target.value;

        dispatch(handleUpdatePoll({
            id,
            answer,
            authedUser
        }))

    }

    render(){
        
        const {poll, hideQuestion} = this.props;
       
        if(poll === null){
            return <p>This poll does not exist </p>
        }

        const {author, question, timestamp, users_answered, answers} = poll;


        return(
                <div className="poll">
                <span className="poll__author">{author}</span>
                <p className="poll__question">{question}</p>
                <small>{formatDate(timestamp)}</small>
                <span className="poll__votes">{users_answered.length}</span>

                <div className={`${hideQuestion ? 'd-none': ''} poll__form`}>
                    
                    <button value={answers[0]} className="button__red" onClick={this.updatePoll}>{answers[0]}</button>
                    <button  value={answers[1]} className="button__red" onClick={this.updatePoll}>{answers[1]}</button>
                </div>
                </div>  
             
           
        )
    }
}

function mapStateToProps({authedUser, polls}, {id, hideQuestion}){  
    const poll = polls[id]

    return {
        authedUser,
        poll,
        hideQuestion,
    }
}

export default withRouter(connect(mapStateToProps)(PollItem))