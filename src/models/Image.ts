
import { Schema, model, Document, Types } from "mongoose";

interface IImage extends Document {
  _id: Types.ObjectId;
  filename: string;
  path: string;
}

const imageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  path: { type: String, required: true }
});

const Image = model<IImage>("Image", imageSchema);

export { Image };
