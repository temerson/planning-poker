import Task from '../models/task';
import sanitizeHtml from 'sanitize-html';

export function getTasks(req, res) {
  Task.find().sort('-dateAdded').exec((err, tasks) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ tasks });
  });
}

export function addTask(req, res) {
  const { task } = req.body;
  if (!task.title || !task.board) {
    res.status(403).end();
  }

  const newTask = new Task(task);
  newTask.title = sanitizeHtml(newTask.title);
  newTask.description = sanitizeHtml(newTask.description);

  newTask.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function deleteTask(req, res) {
  Task.findByIdAndDelete(req.params.taskId).exec(err => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

// ---------------------- votes on a task -------------------------------

export function setUserVote(req, res) {
  if (!req.user) {
    res.status(403).end();
  }

  Task.findById(req.params.taskId).exec((err, task) => {
    if (err) {
      res.status(500).send(err);
    }

    const newTask = new Task(task);
    const existingVote = task.votes.find(vote => vote.user === req.user);
    const newVote = { user: req.user, value: req.value };
    if (existingVote) {
      newTask.votes = task.votes.map(vote => (vote.user === req.user ? vote : newVote));
    } else {
      newTask.votes = [...task.votes, newVote];
    }

    newTask.save((saveErr, saved) => {
      if (saveErr) {
        res.status(500).send(saveErr);
      }
      res.json(saved);
    });
  });
}

export function deleteUserVote(req, res) {
  Task.findById(req.params.taskId).exec((err, board) => {
    if (err) {
      res.status(500).send(err);
    }

    const newTask = new Task(board);
    newTask.users = board.users.filter(user => user.username !== req.params.username);

    newTask.save((saveErr, saved) => {
      if (saveErr) {
        res.status(500).send(saveErr);
      }
      res.json(saved);
    });
  });
}
