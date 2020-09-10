import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ currentUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      currentUser !== null ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

function mapStateToProps({ authedUser }) {
  return {
    currentUser: authedUser.currentUser,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
