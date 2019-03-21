import Board from '../models/board';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

export function getBoards(req, res) {
  Board.find().sort('-dateAdded').exec((err, boards) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ boards });
  });
}

export function addBoard(req, res) {
  const { board } = req.body;
  if (!board.title || !board.owner) {
    res.status(403).end();
  }

  const newBoard = new Board(board);
  newBoard.title = sanitizeHtml(newBoard.title);
  newBoard.slug = slug(newBoard.title.toLowerCase(), { lowercase: true });

  newBoard.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function deleteBoard(req, res) {
  Board.findByIdAndDelete(req.params.boardId).exec(err => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

// ---------------------- users on a given board -------------------------------

export function getUsersOnBoard(req, res) {
  Board.findOne({ slug: req.params.boardSlug }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({
      users: board.users.sort((a, b) => a.name.localeCompare(b.name)),
    });
  });
}

export function addUserToBoard(req, res) {
  const { userId } = req.body;
  if (!userId) {
    res.status(403).end();
  }

  Board.findOne({ slug: req.params.boardId }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }

    if (board.users.find(user => user._id === userId)) {
      res.send(200);
    } else {
      const newBoard = new Board(board);
      newBoard.users = [...board.users, userId];

      newBoard.save((saveErr, saved) => {
        if (saveErr) {
          res.status(500).send(saveErr);
        }
        res.json(saved);
      });
    }
  });
}
