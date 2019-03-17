import Board, { UserSchema } from '../models/board';
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
    res.json({ board: saved });
  });
}

export function getBoard(req, res) {
  Board.findOne({ slug: req.params.boardSlug }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ board });
  });
}

export function deleteBoard(req, res) {
  Board.findOne({ _id: req.params.boardId }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }
    board.remove(() => res.status(200).end());
  });
}

// ---------------------- users on a given board -------------------------------

export function getUsersOnBoard(req, res) {
  Board.findOne({ _id: req.params.boardId }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({
      users: board.users.sort((a, b) => a.name.localeCompare(b.name)),
    });
  });
}

export function addUserToBoard(req, res) {
  Board.findOne({ _id: req.params.boardId }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }

    const newUser = new UserSchema(req.user);
    newUser.username = sanitizeHtml(newUser.username);

    const newBoard = new Board(board);
    newBoard.users = [...board.users, newUser];

    newBoard.save((saveErr, saved) => {
      if (saveErr) {
        res.status(500).send(saveErr);
      }
      res.json({ board: saved });
    });
  });
}

export function removeUserFromBoard(req, res) {
  Board.findOne({ _id: req.params.boardId }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }

    const newBoard = new Board(board);
    newBoard.users = board.users.filter(user => user._id !== req.params.userId);

    newBoard.save((saveErr, saved) => {
      if (saveErr) {
        res.status(500).send(saveErr);
      }
      res.json({ board: saved });
    });
  });
}
