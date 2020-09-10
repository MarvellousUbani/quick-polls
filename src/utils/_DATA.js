let users = {
  mike: {
    id: "mike",
    name: "Marvellous Michaels",
    avatarURL: "https://miro.medium.com/max/3150/2*PqaAYLaw5pGyivg4ZRR0cA.jpeg",
    password: "1234",
  },
  ify: {
    id: "ify",
    name: "Ifeoma Jonah",
    avatarURL:
      "https://avatars3.githubusercontent.com/u/24596411?s=400&u=cc3f88346751cba1cf97af2f450250ff3589ff24&v=4",
    password: "1234",
  },

  diana: {
    id: "diana",
    name: "Diana Rose",
    avatarURL:
      "https://wmoa.com.au/uploads/images/_200xAUTO_crop_center-center_none/Diana-Closeup-2010_compressed.jpg",
    password: "1234",
  },
};

let polls = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    question: "Are you a morning or an evening person?",
    author: "mike",
    timestamp: 1518122597860,
    answers: {
      morning: { name: "morning", number: 0 },
      evening: { name: "evening", number: 1 },
    },
    users_answered: { ify: { answer: "Evening" } },
  },

  "6xf0y6ziyjabvozdd253nd": {
    id: "6xf0y6ziyjabvozdd253nd",
    question: "If you could choose a citizenship, pick one?",
    author: "ify",
    timestamp: 1518122597860,
    answers: {
      canada: { name: "canada", number: 0 },
      malta: { name: "malta", number: 0 },
    },
    users_answered: {},
  },

  "7xf0y6ziyjabvozdd253nd": {
    id: "7xf0y6ziyjabvozdd253nd",
    question: "Would you choose a dog or a cat as pet?",
    author: "mike",
    timestamp: 1518122597860,
    answers: {
      cat: { name: "cat", number: 0 },
      dog: { name: "dog", number: 0 },
    },
    users_answered: {},
  },

  "5xf0y6ziyjabvozdd253nd": {
    id: "5xf0y6ziyjabvozdd253nd",
    question: "100,000$ now or 30000$ every year for the next 4 years?",
    author: "diana",
    timestamp: 1518122597860,
    answers: {
      "4 years": { name: "4 years", number: 0 },
      now: { name: "now", number: 0 },
    },
    users_answered: {},
  },
};

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getPolls() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...polls }), 1000);
  });
}

function formatPoll({
  id,
  author,
  question,
  users_answered = {},
  answers = {},
}) {
  return {
    author,
    id,
    answers,
    users_answered,
    question,
    timestamp: Date.now(),
  };
}

export function _updatePollAnswers({ authedUser, id, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      // Poll users_answered array is updated
      polls = {
        ...polls,
        // [id]: {
        //     ...polls[id],
        //     users_answered: polls[id].users_answered.concat([{name: authedUser.currentUser, answer:answer }])
        // }
      };
    }, 500);
  });
}

export function _savePoll({ author, question, users_answered, answers, id }) {
  return new Promise((res, rej) => {
    const formattedPoll = formatPoll({
      author,
      question,
      users_answered,
      answers,
      id,
    });

    setTimeout(() => {
      polls = {
        ...polls,
        [formattedPoll.id]: formattedPoll,
      };

      res(formattedPoll);
    }, 1000);
  });
}

export function _saveUser({ id, name, avatarURL, password }) {
  return new Promise((res, rej) => {
    const newUser = {
      id,
      name,
      avatarURL,
      password,
    };

    setTimeout(() => {
      users = {
        ...users,
        [newUser.id]: newUser,
      };

      res(newUser);
    }, 1000);
  });
}
