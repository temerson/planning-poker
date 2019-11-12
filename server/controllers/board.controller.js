// who needs a database?
const boards = {};
const nextId = 1;

export function getBoards(req, res) {
  res.status(200).json(boards);
}

export function addBoard(req, res) {
  const id = nextId++;
  boards[id] = { id, ...req.body };
  res.status(201).json(boards[id])
}

export function deleteBoard(req, res) {
  delete boards[req.params.boardId];
  res.status(204).end();
}
