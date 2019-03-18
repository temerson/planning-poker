import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: { type: String, required: true },
  owner: Schema.Types.ObjectId,
  activeTask: Schema.Types.ObjectId,
  slug: { type: String, required: true, unique: true },
  dateAdded: { type: Date, default: Date.now, required: true },
});

export default mongoose.model('Board', BoardSchema);
