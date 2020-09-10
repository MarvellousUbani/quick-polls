import { getInitialData } from "../utils/api";

import { receiveUsers } from "./user/user.action";
import receivePolls from "./poll/poll.action";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, polls }) => {
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(hideLoading());
    });
  };
}
