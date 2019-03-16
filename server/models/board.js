import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

const BoardSchema = new Schema({
  title: { type: 'String', required: true },
  owner: { type: UserSchema, required: true },
  users: [UserSchema],
  slug: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Board', BoardSchema);
