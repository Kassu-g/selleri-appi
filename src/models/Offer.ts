import { Document, Schema, model } from 'mongoose';

interface IOffer extends Document {
  title: string;
  description: string;
  price: number;
  imageId: Schema.Types.ObjectId;
}

const offerSchema = new Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: Schema.Types.ObjectId, ref: 'Image' }
});

const Offer = model<IOffer>('Offer', offerSchema);

export { Offer };
