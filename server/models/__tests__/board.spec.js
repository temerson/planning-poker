import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Board from '../board';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial boards added into test db
const user = new User({ username: 'Ricky' });
const boards = [
  new Board({
    title: 'Red Squadron',
    slug: 'red-squadron',
    owner: user._id,
  }),
  new Board({
    title: 'Black Squadron',
    slug: 'black-squadron',
    owner: user._id,
  }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two board entries', async () => {
  await User.create(user);
  await Board.create(boards);
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Boards', async t => {
  const res = await request(app)
    .get('/api/boards/')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(boards.length, res.body.boards.length);
});

test.serial('Should correctly add a board', async t => {
  console.error(user);
  const res = await request(app)
    .post('/api/boards/')
    .send({ board: { title: 'Beige Squadron', owner: user._id } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedBoard = await Board.findOne({ title: 'Beige Squadron' }).exec();
  t.is(savedBoard.slug, 'beige-squadron');
});

test.serial('Should correctly delete a board', async t => {
  const board = new Board({
    title: 'Rogue Squadron',
    slug: 'rogue-squadron',
    owner: user._id,
  });
  board.save();

  const res = await request(app)
    .delete(`/api/boards/${board._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const deletedBoard = await Board.findOne({ title: 'Beige Squadron' }).exec();
  t.is(deletedBoard, null);
});
