import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddUser} from '../../redux/user/user.action';
import { setCurrentUser } from '../../redux/authedUser/authedUser.action';

class RegisterPage extends Component{
  state =  {
    id:'',
    name: '',
    avatarURL:'',
    password:'', 
    error:'',
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      ...this.state,
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let {id, name, avatarURL, password} = this.state;
    id = id.toLowerCase();
    const {dispatch} = this.props;

    if(id !== "" && name !== "" && avatarURL !== "" && password !== ""){
      dispatch(handleAddUser({id, name, avatarURL, password}));
      dispatch(setCurrentUser(id));
      this.props.history.push(`/`)
    }else{
      this.setState({
        error: "Some Fields are Missing or Incorrect"
      })
    }
   
  }
  
  render(){
        const {id, name, avatarURL, password, error} = this.state;
      return(
        <div>
        <h2 className="text-center">Register</h2>
        <p className="text-center">{error}</p>
        <form onSubmit={this.handleSubmit} className="poll my-4">
        <label className="d-block my-4">  
        <input type="text" placeholder="Username" className="fancy-form" name="id" value={id} onChange={this.handleChange}/>
        </label>

        <label className="d-block my-4">
            <input type="text" placeholder="Fullname" className="fancy-form" name="name" value={name} onChange={this.handleChange}/>
        </label>

        <label className="d-block my-4">
            <input type="text" placeholder="Avatar Link" className="fancy-form" name="avatarURL" value={avatarURL} onChange={this.handleChange}/>
        </label>

        <label className="d-block my-4">
            <input type="password" placeholder="Password" className="fancy-form" name="password" value={password} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Sign Up" className="button__red"/>
      </form>
      </div>
      )
  }
}




export default connect()(RegisterPage);