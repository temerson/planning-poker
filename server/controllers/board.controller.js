import * as db from '../db';

export function getBoards(req, res) {
  res.status(200).json(Object.values(db.store.boards));
}

export function addBoard(req, res) {
  const board = db.addBoard(req.body);
  res.status(201).json(board)
}

export function deleteBoard(req, res) {
  delete boards[req.params.boardId];
  res.status(204).end();
}
