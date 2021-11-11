// import { Schema } from 'mongoose';
//
// export const ContainerModelName = 'Container';
//
// export const ContainerSchema = new Schema({
//   name: String,
//   size: Number,
//   type: String,
//   isActive: { type: Boolean, default: true },
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContainerDocument = Container & Document;

@Schema({ timestamps: true })
export class Container {
  @Prop()
  name: string;

  @Prop()
  size: number;

  @Prop()
  type: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ContainerSchema = SchemaFactory.createForClass(Container);
