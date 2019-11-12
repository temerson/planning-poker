import slug from 'limax';

let nextBoardId = 2;

export const store = {
  boards: {1: {
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
  const newBoard = {
    id: boardId,
    slug: slug(board.title.toLowerCase()) + '-' + boardId,
    task: {},
    users: [],
    ...board,
  };
  store.boards[boardId] = newBoard;
  return newBoard;
}

export const setVote = (boardId, username, vote) => {
  store.boards[boardId].users
    .find(user => user.username === username).vote = vote;
}

export const resetBoard = boardId => {
  const board = store.boards[boardId];
  board.task = {};
  board.users = board.users.map(user => ({ username: user.username }));
}
