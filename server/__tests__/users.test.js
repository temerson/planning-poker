import request from 'supertest';
import User from '../models/user';
import app from '../app';
import { connectDB, dropDB } from '../util/test-helpers';

const users = [
  new User({ username: 'Ricky' }),
  new User({ username: 'Joel' }),
];

beforeAll(async () => await connectDB());

beforeEach(async () => await User.create(users));

afterAll(async () => await dropDB());

describe('GET /user/:userId', () => {
  test('it responds with the user having the passed id', async () => {
    const ricky = User.findOne({ username: 'Ricky' });
    const response = await request(app).get(`/users/${ricky._id}`);
    expect(response.body.username).toBe('Ricky');
  });
});
