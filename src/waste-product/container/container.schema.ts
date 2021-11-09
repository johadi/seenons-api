import { Schema } from 'mongoose';

export const ContainerModelName = 'Container';

export const ContainerSchema = new Schema({
  name: String,
  size: Number,
  type: String,
  isActive: { type: Boolean, default: true },
});
