import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {setCurrentUser} from '../../redux/authedUser/authedUser.action';

import {selectCurrentUser} from '../../redux/authedUser/authedUser.selectors';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faMedal } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, faMedal)

class Header extends Component{

    logout = e => {
        const {dispatch} = this.props;
        dispatch(setCurrentUser(null));
        this.props.history.push(`/`)
    }

    render(){
        const {currentUser} = this.props;
        return(
            <nav className="main__nav">
                    <Link to="/" className="main__nav--logo"><span className="text__red"><FontAwesomeIcon icon="medal"/></span> QUICK <span className="text__red">POLLS</span></Link>
                    <Link to="/new" className="button__red poll__btn">Create Poll</Link>
                    
                       
                        { currentUser ? <ul className="main__nav--list">
                        <li className="main__nav--listitems"><Link to="/polls">View Polls</Link></li>
                        <li className="main__nav--listitems"><Link to="/leaderboard">Leaderboard</Link></li>
                        <li className="main__nav--listitems pointer" onClick={this.logout}>Logout</li></ul>:<ul className="main__nav--list">
                        <li className="main__nav--listitems"><Link to="/login">Login</Link></li>
                        <li className="main__nav--listitems"><Link className="button__red" to="/register">Sign Up</Link></li></ul>
                        }
                        
                    
                </nav>
            )
    }
}




const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
})

export default withRouter(connect(mapStateToProps)(Header));