import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {handleAddPoll} from '../../redux/poll/poll.action';

class NewPoll extends Component{
  state = {
      question:'',
      firstchoice: '',
      secondchoice: '',
      error:'',
  }

  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    this.setState({
        ...this.state,
        [name]: value
    })
  }

  handleSubmit = (e) => {
      e.preventDefault();
      
      const { question, firstchoice, secondchoice } = this.state;
      const {dispatch, authedUser} = this.props;
      const id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      if(authedUser){
        dispatch(handleAddPoll({question, authedUser, firstchoice, secondchoice, id}))
        this.setState(() => ({
            question: '',
            firstchoice:'',
            secondchoice:'',
        }))
        this.props.history.push(`/polls`)
      }
      else{
        this.setState({
            error:"You have to login or Register to create a poll."
        })
      }
      
  }

  render(){
      const {question, firstchoice, secondchoice, error} = this.state;
      return(
          <div>
        <h2 className="text-center">Add New Poll</h2>
        <p className="text-center">{error}</p>
        <form onSubmit={this.handleSubmit} className="poll my-4">
        <label className="d-block my-4">
         
          <textarea placeholder="Pick A Question:" className="fancy-form" name="question" value={question} onChange={this.handleChange}/>
        </label>

        <label className="d-block my-4">
            <input type="text" placeholder="First Choice" className="fancy-form" name="firstchoice" value={firstchoice} onChange={this.handleChange}/>
        </label>
        <label className="d-block my-4">
            <input type="text" placeholder="Second Choice" className="fancy-form" name="secondchoice" value={secondchoice} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" className="button__red" disabled={question === "" || firstchoice === "" || secondchoice === ""}/>
      </form>
      </div>
      )
  }
}

function mapStateToProps({authedUser:{currentUser}}){
    return{
        authedUser: currentUser
    }
}

export default withRouter(connect(mapStateToProps)(NewPoll));