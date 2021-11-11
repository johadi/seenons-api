import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Container } from '../container/container.schema';
import { ServiceProvider } from '../../service-provider/service-provider.schema';

export type StreamDocument = Stream & Document;

@Schema()
export class Stream {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  unitWeight: number;

  @Prop()
  type: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Container.name }] })
  containers: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: ServiceProvider.name }] })
  serviceProviders: string[];

  @Prop([Number])
  postalCodes: number[];

  @Prop(raw([{ day: Number, timeslots: [String] }]))
  availableDays: Record<string, any>[];

  @Prop({ default: true })
  isActive: boolean;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);
