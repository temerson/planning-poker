import slug from 'limax';

let nextBoardId = 2;

export const store = {
  boards: {1: {
    slug: 'my-board',
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
    slug: slug(req.body.title.toLowerCase()),
    task: {},
    users: [],
    ...board,
  };
  store.boards[boardId] = newBoard;
  return newBoard;
}

export const deleteBoard = boardId => {
  delete store.boards[boardId];
}
