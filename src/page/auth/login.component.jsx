import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setCurrentUser } from "../../redux/authedUser/authedUser.action";
import { selectUsers } from "../../redux/user/user.selectors";

const LoginPage = ({ dispatch, users, history }) => {
  const [id, setId] = useState("");
  const [password, setPass] = useState("");
  const [error, setErrorMessage] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = id.toLowerCase();
    // Get store check that user id in store has a password then dispatch
    if (users[username] && users[username].password === password) {
      dispatch(setCurrentUser(username));
      history.push(`/`);
    } else {
      setErrorMessage("Username or Password is Incorrect");
    }
  };

  return (
    <div>
      <h2 className="text-center">Login</h2>
      <p className="text-center">{error}</p>
      <form onSubmit={handleSubmit} className="poll my-4">
        <label className="d-block my-4">
          <input
            type="text"
            placeholder="Username"
            className="fancy-form"
            name="id"
            value={id}
            onChange={handleId}
          />
        </label>

        <label className="d-block my-4">
          <input
            type="password"
            placeholder="Password"
            className="fancy-form"
            name="password"
            value={password}
            onChange={handlePass}
          />
        </label>
        <input type="submit" value="Login" className="button__red" />
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
});

export default connect(mapStateToProps)(LoginPage);
