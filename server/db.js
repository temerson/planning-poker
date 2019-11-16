import slug from 'limax';

let nextBoardId = 2;

// This is a very crude in-memory database. It's easier to iterate on while
// hammering out the schema than a Mongo DB would be.
export const store = {
  boards: {'my-board-1': {
    slug: 'my-board-1',
    title: 'My Board',
    task: {
      title: 'Working on some stuff',
      description: 'Do things and other stuff really good like',
    },
    users: [],
  }},
};

export const addBoard = board => {
  const boardId = nextBoardId++;
  const boardSlug = slug(board.title.toLowerCase()) + '-' + boardId;
  const newBoard = {
    id: boardId,
    slug: boardSlug,
    task: {},
    users: [],
    ...board,
  };
  store.boards[boardSlug] = newBoard;
  return newBoard;
}

export const addUserToBoard = (boardSlug, username) => {
  const board = store.boards[boardSlug];
  board.users = [ ...board.users, { username }];
}

export const removeUserFromBoard = (boardSlug, username) => {
  const board = store.boards[boardSlug];
  board.users = board.users.filter(user => user.username !== username);
}

export const setUserVote = (boardSlug, username, vote) => {
  store.boards[boardSlug].users
    .find(user => user.username === username).vote = vote;
}

export const resetBoard = boardSlug => {
  const board = store.boards[boardSlug];
  board.task = {};
  board.users = board.users.map(user => ({ username: user.username }));
}
