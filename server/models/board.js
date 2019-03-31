import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: { type: String, required: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  activeTask: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  slug: { type: String, required: true, unique: true },
  dateAdded: { type: Date, default: Date.now, required: true },
});

export default mongoose.model('Board', BoardSchema);
