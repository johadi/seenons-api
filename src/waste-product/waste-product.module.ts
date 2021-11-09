import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StreamModelName, StreamSchema } from './stream/stream.schema';
import {
  ContainerModelName,
  ContainerSchema,
} from './container/container.schema';
import { ContainerController } from './container/container.controller';
import { ContainerService } from './container/container.service';
import { StreamController } from './stream/stream.controller';
import { StreamService } from './stream/stream.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StreamModelName, schema: StreamSchema },
      { name: ContainerModelName, schema: ContainerSchema },
    ]),
  ],
  controllers: [ContainerController, StreamController],
  providers: [ContainerService, StreamService],
})
export class WasteProductModule {}
