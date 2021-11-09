import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderController } from './service-provider.controller';

import { MongooseModule } from '@nestjs/mongoose';
import {
  ServiceProviderModelName,
  ServiceProviderSchema,
} from './service-provider.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ServiceProviderModelName, schema: ServiceProviderSchema },
    ]),
  ],
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService],
})
export class ServiceProviderModule {}
