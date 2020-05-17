export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }

export function userCreatedPolls(polls, name){
  return  Object.values(polls).filter(user => user.author === name).length;
 
}

export function userAnsweredPolls(polls, name){
  return Object.values(polls).filter(poll => poll.users_answered.some(user => user.name === name)).length;
}

export function totalUserPolls(polls, name){
  let createdPolls = userCreatedPolls(polls, name);
  let answeredPolls = userAnsweredPolls(polls, name);

  return createdPolls + answeredPolls;
}

export function isAnsweredPoll(polls, id, authedUser){
  const ans = polls[id].users_answered.some(user => user.name === authedUser.currentUser);
  return ans;
 
}

export function answerPercentage(polls, id, answer){
  const totalAnswers = polls[id].users_answered.length;
  const specificAnswers = polls[id].users_answered.filter(i => i.answer === answer).length;
  return (specificAnswers/totalAnswers) * 100 ;
}

export function sortedUserLeaderboard(polls, users){
  let leaderboardUsers = []

  Object.values(users).forEach(person => {
    let name = person.id;
    let fullname = person.name;
    let avatarURL = person.avatarURL;
    let createdPolls= Object.values(polls).filter(user => user.author === person.id).length;
    let answeredPolls= Object.values(polls).filter(poll => poll.users_answered.some(user => user.name === person.id)).length;
    let total = createdPolls + answeredPolls;
    
    leaderboardUsers.push({
     name,
     fullname,
     avatarURL,
     answeredPolls,
     createdPolls,
     total
    })
    
  }) 

  return leaderboardUsers.sort((a, b) => a.total - b.total).reverse();
}