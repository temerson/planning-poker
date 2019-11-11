import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import cookie from 'cookie';

export function getUser(req, res) {
  const { userId } = req.params;
  if (!userId) {
    res.status(403).send();
    return;
  }

  User.findById(userId).exec()
    .then(user => res.json(user))
    .catch(err => {
      res.status(404).send(err);
    });
}

export function registerUser(req, res) {
  const user = req.body;
  if (!user || !user.username) {
    res.status(403).send();
    return;
  }

  // TODO: check for duplicate
  // TODO: register for a specific board

  const newUser = new User(user);
  newUser.username = sanitizeHtml(newUser.username);

  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.setHeader('Set-Cookie', cookie.serialize('userId', saved._id, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      }));
      res.send(saved);
    }
  });
}
