import slug from 'limax';
import cookie from 'cookie';
import sanitizeHtml from 'sanitize-html';
import Board from '../models/board';
import User from '../models/user';

export function getBoards(req, res) {
  Board.find().sort('-dateAdded').exec((err, boards) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ boards });
  });
}

export function addBoard(req, res) {
  const { board, username } = req.body;

  // requires a title and either an owner ID or username
  if (!board.title || (!board.owner && !username)) {
    res.status(403).end();
  }

  let promise;
  if (board.owner) {
    promise = Promise.resolve({ _id: board.owner });
  } else {
    // no owner, create a new user
    const newUser = new User();
    newUser.username = sanitizeHtml(username);
    promise = newUser.save()
      .then(saved => {
        res.setHeader('Set-Cookie', cookie.serialize('userId', saved._id, {
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        }));
        return saved;
      });
  }

  promise
    .then(user => {
      const newBoard = new Board(board);
      newBoard.title = sanitizeHtml(newBoard.title);
      newBoard.slug = slug(newBoard.title.toLowerCase(), { lowercase: true });
      newBoard.owner = user._id;
      return newBoard.save();
    })
    .then(saved => res.json(saved))
    .catch(err => res.status(500).send(err));
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

  Board.findOne({ slug: req.params.boardSlug }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }

    console.log(board.users);
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

// ---------------------- tasks on a given board -------------------------------

export function changeActiveTask(req, res) {
  res.status(200);
}

export function changeActiveTask2(req, res) {
  const { title, description } = req.body;

  Board.findOne({ slug: req.params.boardSlug }).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }
    board.save({
      title: sanitizeHtml(title),
      descreption: sanitizeHtml(description),
    });
    res.json({ task: board.task });
  });
}
