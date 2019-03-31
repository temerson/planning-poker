import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  username: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now, required: true },
});

export default mongoose.model('User', UserSchema);
