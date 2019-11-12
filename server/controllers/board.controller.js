import * as db from '../db';

export function getBoards(req, res) {
  const boardSummaries = Object.values(db.store.boards)
    .map(board => ({
      title: board.title,
      slug: board.slug,
    }));
  res.status(200).json(boardSummaries);
}

export function addBoard(req, res) {
  if (!req.body || req.body.length === 0) {
    res.status(500).send('Request must include a title');
  } else {
    const board = db.addBoard(req.body);
    res.status(201).json(board)
  }
}

export function deleteBoard(req, res) {
  delete boards[req.params.boardId];
  res.status(204).end();
}
