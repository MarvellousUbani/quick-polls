export const updateAnswer = (answers, answer) => {
  let answerObj = answers;
  answerObj[answer].number += 1;

  return answerObj;
};

export const updateUsersAnswered = (users_answered, user, answer) => {
  let usersObj = users_answered;
  usersObj[user] = { answer: answer };

  return usersObj;
};
