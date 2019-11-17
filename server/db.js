import slug from 'limax';

let nextBoardId = 2;

// This is a very crude in-memory database. It's easier to iterate on while
// hammering out the schema than a Mongo DB would be.
export const store = { boards: {} };

export const addBoard = (board) => {
  const boardId = nextBoardId++;
  const boardSlug = slug(board.title.toLowerCase()) + '-' + boardId;
  const newBoard = {
    id: boardId,
    slug: boardSlug,
    title: board.title,
    owner: board.username,
    showVotes: false,
    task: {},
    users: [],
  };
  store.boards[boardSlug] = newBoard;
  return newBoard;
}

export const addUserToBoard = (boardSlug, username) => {
  const board = store.boards[boardSlug];
  board.users = [ ...board.users, { username }];
}

const setDeleteBoardTimer = (boardSlug, timeout) => setTimeout(() => {
  const board = store.boards[boardSlug];
  if (board && board.users.length === 0) {
    delete store.boards[boardSlug];
  }
}, timeout);

export const removeUserFromBoard = (boardSlug, username) => {
  const board = store.boards[boardSlug];
  const newUsers = board.users.filter(user => user.username !== username);
  board.users = newUsers;
  if (newUsers.length === 0) {
    // wait 10 seconds after the last user leaves before deleting the board
    setDeleteBoardTimer(boardSlug, 10000);
  }
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

export const updateTask = (boardSlug, task) => {
  const board = store.boards[boardSlug];
  board.task = task;
}

export const setShowVotes = (boardSlug, showVotes) => {
  const board = store.boards[boardSlug];
  board.showVotes = showVotes;
}
