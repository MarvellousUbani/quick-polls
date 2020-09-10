import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { handleAddPoll } from "../../redux/poll/poll.action";
import { selectCurrentUser } from "../../redux/authedUser/authedUser.selectors";

const NewPoll = ({ dispatch, authedUser, history }) => {
  const [question, setQuestion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [choices, setChoices] = useState([]);

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoices = (e) => {
    if (e.key === "Enter") {
      setChoices([...choices, e.target.value]);
      e.target.value = "";
    }
  };

  const resetForm = () => {
    setQuestion("");
    setChoices([]);
    setErrorMessage("");
  };

  const handleResponses = (e, id) => {
    let responses = {};
    choices.forEach(
      (choice) => (responses[choice] = { name: choice, number: 0 })
    );

    if (authedUser) {
      if (choices.length > 1 && e.key !== "Enter") {
        dispatch(
          handleAddPoll({ question, authedUser, answers: responses, id })
        );
        resetForm();
        setTimeout(() => {
          history.push(`/polls`);
        }, 1000);
      } else {
        setErrorMessage("Have 2+ options and tap the submit button");
      }
    } else {
      setErrorMessage("You have to login or Register to create a poll.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    handleResponses(e, id);
  };

  return (
    <div>
      <h2 className="text-center">Add New Poll</h2>
      <p className="text-center">{errorMessage}</p>
      <div className="poll my-4">
        <label className="d-block my-4">
          <textarea
            placeholder="Pick A Question:"
            className="fancy-form"
            name="question"
            value={question}
            onChange={handleQuestion}
          />
        </label>

        <label className="d-block my-4">
          <input
            type="text"
            placeholder="Enter Possible Answers"
            className="fancy-form"
            name="choices"
            onKeyPress={handleChoices}
          />
        </label>

        <div className="choices__box">
          {choices.map((choice) => {
            return <span key={choice}>{choice}</span>;
          })}
        </div>

        <input
          type="submit"
          value="Submit"
          className="button__red"
          onClick={handleSubmit}
          disabled={question === "" || choices.length < 2}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  authedUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(NewPoll));
