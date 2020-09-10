import React, { Component, Fragment } from "react";

import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./redux/shared";
import PrivateRoute from "./utils/private-routes";
import LoadingBar from "react-redux-loading";
import Home from "./page/home/home.component";
import Header from "./components/header/header.component";
import Polls from "./components/poll-list/poll-list.component";
import PollPage from "./page/poll/poll-page.component";
import NewPoll from "./components/new-poll/new-poll.component";
import LeaderPage from "./page/leaderboard/leaderboard.component";
import RegisterPage from "./page/auth/register.component";
import LoginPage from "./page/auth/login.component";
import ErrorPage from "./page/error/error.component";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Fragment>
        <LoadingBar />
        <Header />
        <main className="main__body">
          {!this.props.loading && (
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/polls" component={Polls} />
              <PrivateRoute path="/poll/:id" component={PollPage} />
              <Route path="/add" component={NewPoll} />
              <PrivateRoute path="/leaderboard" component={LeaderPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route component={ErrorPage} />
            </Switch>
          )}
        </main>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, polls, users }) {
  return {
    loading: authedUser === null && polls == null && users == null,
  };
}

export default connect(mapStateToProps)(App);
