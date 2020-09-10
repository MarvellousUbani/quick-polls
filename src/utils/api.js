import {
  _getUsers,
  _getPolls,
  _savePoll,
  _updatePollAnswers,
  _saveUser,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getPolls()]).then(([users, polls]) => ({
    users,
    polls,
  }));
}

export function updatePoll(info) {
  return _updatePollAnswers(info);
}

export function savePoll(info) {
  return _savePoll(info);
}

export function saveUser(info) {
  return _saveUser(info);
}
