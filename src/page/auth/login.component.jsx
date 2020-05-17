import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setCurrentUser} from '../../redux/authedUser/authedUser.action';

class LoginPage extends Component{

  state = {
      id:'',
      password:'',
      error:''
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
    let {id, password} = this.state;
    id = id.toLowerCase();
    // Get store check that user id in store has a password then dispatch
    const {dispatch, users} = this.props;
    if(users[id] && users[id].password === password){
        dispatch(setCurrentUser(id));
        this.props.history.push(`/`)
    }else{
        this.setState({
            ...this.state,
            error: "Username or Password is Incorrect"
        })
    }

  
  }
  
  
    
  render(){
       const {id, error, password} = this.state;
      return(
        <div>
        <h2 className="text-center">Login</h2>
        <p className="text-center">{error}</p>
        <form onSubmit={this.handleSubmit} className="poll my-4">
        <label className="d-block my-4">  
        <input type="text" placeholder="Username" className="fancy-form" name="id" value={id} onChange={this.handleChange}/>
        </label>

        <label className="d-block my-4">
            <input type="password" placeholder="Password" className="fancy-form" name="password" value={password} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Login" className="button__red"/>
      </form>
      </div>
      )
  }
}


function mapStateToProps({users}){
    return{
        users
    }
}

export default connect(mapStateToProps)(LoginPage);