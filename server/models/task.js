import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const VoteSchema = new Schema({
  user: Schema.Types.ObjectId,
  value: { type: String, required: true },
});

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  board: { type: Schema.Types.ObjectId, required: true },
  votes: [VoteSchema],
  dateAdded: { type: Date, default: Date.now, required: true },
});

export default mongoose.model('Task', TaskSchema);
