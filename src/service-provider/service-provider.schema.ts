import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceProviderDocument = ServiceProvider & Document;

@Schema()
export class ServiceProvider {
  @Prop()
  name: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const ServiceProviderSchema =
  SchemaFactory.createForClass(ServiceProvider);
