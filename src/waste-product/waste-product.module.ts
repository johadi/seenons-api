import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamSchema, Stream } from './stream/stream.schema';
import { ContainerSchema, Container } from './container/container.schema';
import { ContainerController } from './container/container.controller';
import { ContainerService } from './container/container.service';
import { StreamController } from './stream/stream.controller';
import { StreamService } from './stream/stream.service';
import { ServiceProviderModule } from '../service-provider/service-provider.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Stream.name, schema: StreamSchema },
      { name: Container.name, schema: ContainerSchema },
    ]),
    ServiceProviderModule,
  ],
  controllers: [ContainerController, StreamController],
  providers: [ContainerService, StreamService],
})
export class WasteProductModule {}
