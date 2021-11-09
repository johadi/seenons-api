import { Schema } from 'mongoose';

export const ServiceProviderModelName = 'ServiceProvider';

export const ServiceProviderSchema = new Schema({
  name: String,
  isActive: { type: Boolean, default: true },
});
