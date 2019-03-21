import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import cookie from 'cookie';

export function registerUser(req, res) {
  const user = req.body;
  if (!user || !user.username) {
    res.status(403).send();
    return;
  }
  // TODO: check for duplicate

  const newUser = new User(user);
  newUser.username = sanitizeHtml(newUser.username);

  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.setHeader('Set-Cookie', cookie.serialize('user', saved._id, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
      }));
    }
  });
}
