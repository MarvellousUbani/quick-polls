export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

// Converts object to array
export function mappable(item) {
  return Object.values(item);
}

// user answer

export function answerPercentage(polls, id, answer) {
  const totalAnswers = polls[id].users_answered.length;
  const specificAnswers = polls[id].users_answered.filter(
    (i) => i.answer === answer
  ).length;
  return (specificAnswers / totalAnswers) * 100;
}

export function sortedUserLeaderboard(polls, users) {
  let leaderboardUsers = [];

  Object.values(users).forEach((person) => {
    let name = person.id;
    let fullname = person.name;
    let avatarURL = person.avatarURL;
    let createdPolls = Object.values(polls).filter(
      (user) => user.author === person.id
    ).length;
    let answeredPolls = Object.values(polls).filter(
      (poll) => poll.users_answered[name]
    ).length;
    let total = createdPolls + answeredPolls;

    leaderboardUsers.push({
      name,
      fullname,
      avatarURL,
      answeredPolls,
      createdPolls,
      total,
    });
  });

  return leaderboardUsers.sort((a, b) => a.total - b.total).reverse();
}
