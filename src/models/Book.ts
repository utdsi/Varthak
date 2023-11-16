import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  createdAt: Date;
  createdBy:mongoose.Schema.Types.ObjectId;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IBook>('Book', bookSchema);
