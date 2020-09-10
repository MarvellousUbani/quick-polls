import React from "react";
import homepoll from "../../assets/homepoll.jpg";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/authedUser/authedUser.selectors";

const Home = ({ currentUser }) => (
  <div className="row home-row spacer__15">
    <div className="col">
      <h2 className="main__body--title">
        Create instant, real-time <span className="text__red">polls</span> for
        free
      </h2>
      <Link to="/polls" className="button__red big-btn my-4 d-inline-block">
        {currentUser ? "Go to Polls" : "Get Started Now"}
      </Link>
      <p>
        <small>Its 100% free and tales less than a minute</small>
      </p>
    </div>
    <div className="col">
      <img src={homepoll} alt="" className="poll-img" />
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Home);
