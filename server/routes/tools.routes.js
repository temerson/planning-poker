import { Router } from 'express';
import mongoose from 'mongoose';

const router = new Router();
router.route('/reset').get(() => {
  mongoose.connection.dropCollection('test.tasks');
  mongoose.connection.dropCollection('test.users');
  mongoose.connection.dropCollection('test.boards');
});

export default router;
