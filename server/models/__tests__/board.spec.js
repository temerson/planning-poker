import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Board from '../board';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial boards added into test db
const boards = [
  new Board({
    title: 'Red Squadron',
    slug: 'red-squadron',
    owner: { username: 'tsoule' },
  }),
  new Board({
    title: 'Black Squadron',
    slug: 'black-squadron',
    owner: { username: 'temerson' },
  }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two board entries', async () => {
  await Board.create(boards).catch(() => 'Unable to create boards');
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

test.serial('Should send correct data when queried against an id', async t => {
  const board = new Board({
    title: 'Rogue Squadron',
    slug: 'rogue-squadron',
    owner: { username: 'sbleve' },
  });
  board.save();

  const res = await request(app)
    .get(`/api/boards/${board._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.board.name, board.name);
});

test.serial('Should correctly add a board', async t => {
  const res = await request(app)
    .post('/api/boards/')
    .send({ board: { title: 'Beige Squadron', slug: 'beige-squadron', owner: { username: 'sbleve' } } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedBoard = await Board.findOne({ title: 'Beige Squadron' }).exec();
  t.is(savedBoard.slug, 'beige-squadron');
});

test.serial('Should correctly delete a board', async t => {
  const board = new Board({
    title: 'Rogue Squadron',
    slug: 'rogue-squadron',
    owner: { username: 'sbleve' },
  });
  board.save();

  const res = await request(app)
    .delete(`/api/boards/${board._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const deletedBoard = await Board.findOne({ title: 'Beige Squadron' }).exec();
  t.is(deletedBoard, null);
});
