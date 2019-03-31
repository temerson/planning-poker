import Task, { Vote } from '../models/task';
import sanitizeHtml from 'sanitize-html';
import cookie from 'cookie';

export function getTask(req, res) {
  Task.findById(req.params.taskId)
    .populate('votes.user')
    .then(task => {
      res.json(task);
    })
    .catch(err => res.status(500).send(err));
}

export function addTask(req, res) {
  const { task } = req.body;
  if (!task.title || !task.board) {
    res.status(403).end();
  }

  const newTask = new Task(task);
  newTask.title = sanitizeHtml(newTask.title);
  newTask.description = sanitizeHtml(newTask.description);

  newTask.save()
    .then(saved => res.json(saved))
    .catch(err => res.status(500).send(err));
}

export function editTask(req, res) {
  Task.findById(req.params.taskId) // TODO: findByIdAndUpdate?
    .then(task => {
      const { title, description } = req.body;
      const changedTask = new Task(task);
      changedTask.title = sanitizeHtml(title);
      changedTask.description = sanitizeHtml(description);
      changedTask.save();

      res.json(changedTask);
    })
    .catch(err => res.status(404).send(err));
}

export function deleteTask(req, res) {
  Task.findByIdAndDelete(req.params.taskId)
    .then(() => res.status(200).end())
    .catch(err => res.status(500).send(err));
}

// ---------------------- votes on a task -------------------------------

export function setUserVote(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const userId = cookies.userId;
  const { value } = req.body;

  if (!userId) {
    res.status(403).send('userId cookie is required');
  }
  if (!value) {
    res.status(403).send('no value passed');
  }

  Task.findById(req.params.taskId)
    .then(task => {
      const newTask = new Task(task);
      const existingVote = task.votes.find(vote => vote.user.equals(userId));
      const newVote = { user: userId, value };

      if (existingVote) {
        newTask.votes = task.votes.map(vote => (vote.user.equals(userId) ? newVote : vote));
      } else {
        newTask.votes = [...task.votes, newVote];
      }

      newTask.save()
        .then(saved => Task.populate(saved, 'votes.user'))
        .then(saved => res.json(saved))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
}

export function deleteUserVote(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const userId = cookies.userId;

  if (!userId) {
    res.status(403).send('userId cookie is required');
  }

  Task.findById(req.params.taskId)
    .then(task => {
      const newTask = new Task(task);
      newTask.votes = task.votes.filter(vote => !vote.user.equals(userId));

      newTask.save()
        .then(saved => Task.populate(saved, 'votes.user'))
        .then(saved => res.json(saved))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
}
