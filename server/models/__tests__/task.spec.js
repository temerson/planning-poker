import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Board from '../board';
import User from '../user';
import Task from '../task';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial tasks added into test db
const user = new User({ username: 'Ricky' });
const board = new Board({
  title: 'Red Squadron',
  slug: 'red-squadron',
  owner: user._id,
});
const tasks = [
  new Task({
    title: 'Add resources',
    description: 'user can add resources',
    board: board._id,
  }),
  new Task({
    title: 'Set resource permissions',
    description: 'user can set permissions on a resource',
    board: board._id,
  }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two task entries', async () => {
  await User.create(user);
  await Board.create(board);
  await Task.create(tasks);
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Tasks', async t => {
  const res = await request(app)
    .get('/api/tasks/')
    .set('Accept', 'applicationjson');

  t.is(res.status, 200);
  t.deepEqual(tasks.length, res.body.tasks.length);
});

test.serial('Should correctly add a task', async t => {
  const res = await request(app)
    .post('/api/tasks/')
    .send({ task: { title: 'Remove a resource', description: 'Deletes', board: board._id } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedTask = await Task.findOne({ title: 'Remove a resource' }).exec();
  t.is(savedTask.description, 'Deletes');
});

test.serial('Should correctly delete a task', async t => {
  const task = new Task({
    title: 'Remove a resource',
    board: board._id,
  });
  task.save();

  const res = await request(app)
    .delete(`/api/tasks/${task._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const deletedTask = await Task.findOne({ title: 'Remove a resource' }).exec();
  t.is(deletedTask, null);
});
