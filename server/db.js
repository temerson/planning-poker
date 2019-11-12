import slug from 'limax';

let nextBoardId = 2;

export const store = {
  boards: {'my-board-1': {
    slug: 'my-board-1',
    title: 'My Board',
    task: {
      title: 'Working on some stuff',
      description: 'Do things and other stuff really good like',
    },
    users: [{
        username: 'Steve',
        vote: 1,
      }, {
        username: 'Mark',
        vote: 3,
      }, {
        username: 'Deb B',
      },
    ],
  }},
};

export const addBoard = board => {
  const boardId = nextBoardId++;
  const slug = slug(board.title.toLowerCase()) + '-' + boardId;
  const newBoard = {
    id: boardId,
    slug,
    task: {},
    users: [],
    ...board,
  };
  store.boards[slug] = newBoard;
  return newBoard;
}

export const setVote = (boardSlug, username, vote) => {
  store.boards[boardSlug].users
    .find(user => user.username === username).vote = vote;
}

export const resetBoard = boardSlug => {
  const board = store.boards[boardSlug];
  board.task = {};
  board.users = board.users.map(user => ({ username: user.username }));
}
