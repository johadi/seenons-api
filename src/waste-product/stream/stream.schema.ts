import { Schema, Types } from 'mongoose';
import { ContainerModelName } from '../container/container.schema';

export const StreamModelName = 'Stream';

export const StreamSchema = new Schema({
  name: String,
  description: String,
  unit_weight: Number,
  type: String,
  sizes: [{ type: Types.ObjectId, ref: ContainerModelName }],
  isActive: { type: Boolean, default: true },
});
