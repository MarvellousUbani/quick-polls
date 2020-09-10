import React, { useState } from "react";
import { connect } from "react-redux";
import { handleAddUser } from "../../redux/user/user.action";
import { setCurrentUser } from "../../redux/authedUser/authedUser.action";
import profileimg from "../../assets/man.png";

const RegisterPage = ({ history, dispatch }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [avatarURL, setAvatar] = useState("");
  const [error, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const propname = e.target.name;
    const value = e.target.value;

    switch (propname) {
      case `id`:
        return setId(value);
      case `name`:
        return setName(value);
      case `password`:
        return setPass(value);
      case `avatarURL`:
        return setAvatar(value);
      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = id.toLowerCase();

    if (username !== "" && name !== "" && password !== "") {
      dispatch(
        handleAddUser({
          id: username,
          name,
          avatarURL: avatarURL || profileimg,
          password,
        })
      );
      dispatch(setCurrentUser(username));
      history.push(`/`);
    } else {
      setErrorMessage("Some Fields are Missing or Incorrect");
    }
  };
  return (
    <div>
      <h2 className="text-center">Register</h2>
      <p className="text-center">{error}</p>
      <form onSubmit={handleSubmit} className="poll my-4">
        <label className="d-block my-4">
          <input
            type="text"
            placeholder="Username"
            className="fancy-form"
            name="id"
            value={id}
            onChange={handleChange}
          />
        </label>

        <label className="d-block my-4">
          <input
            type="text"
            placeholder="Fullname"
            className="fancy-form"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>

        <label className="d-block my-4">
          <input
            type="text"
            placeholder="Avatar Link"
            className="fancy-form"
            name="avatarURL"
            value={avatarURL}
            onChange={handleChange}
          />
        </label>

        <label className="d-block my-4">
          <input
            type="password"
            placeholder="Password"
            className="fancy-form"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Sign Up" className="button__red" />
      </form>
    </div>
  );
};

export default connect()(RegisterPage);
