import React, {Component} from 'react';
import {connect} from 'react-redux';
import PollItem from '../poll-item/poll-item.component';
import CurrentUserInfo from '../current-user-info/current-user-info.component';
import {Link} from 'react-router-dom';
import {selectPolls, selectNotAnsweredPolls, selectAnsweredPolls} from '../../redux/poll/poll.selectors';
import {selectCurrentUser} from '../../redux/authedUser/authedUser.selectors';
import {createStructuredSelector} from 'reselect';

class Poll extends Component {
    state = {
        polls: this.props.notanswered
    }

    answered = e => {
        e.preventDefault();
        this.setState({
           polls: this.props.answered
        })
    }

    notanswered = e => {
        e.preventDefault();
        this.setState({
            polls: this.props.notanswered
        })
    }

    render(){
        const { polls } = this.state;
        const { currentUser } = this.props;
        return(
            <div>
            <CurrentUserInfo />
            <div className="polls__list">
            <div className="row justify-center question--tab">
                <button className="button__red" onClick={this.answered}>Answered Question(s)</button>
                <button className="button__red" onClick={this.notanswered}>Unanswered Question(s)</button>
            </div>
            {
                polls.map((poll) =>  
                <Link to={`/poll/${poll.id}`} key={poll.id} >       
                    <PollItem poll={poll} currentUser={currentUser} hideQuestion/>
                </Link>)
            }

            </div> 
            </div>
        )
    }
}



const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    polls: selectPolls,
    notanswered: selectNotAnsweredPolls,
    answered: selectAnsweredPolls
})

export default connect(mapStateToProps)(Poll);

