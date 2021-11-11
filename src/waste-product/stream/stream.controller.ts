import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StreamService } from './stream.service';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { AddPostalCodeDto } from './dto/add-postalcode.dto';
import { AddDayDto } from './dto/add-day.dto';
import { ParseMongoIdPipe } from '../../pipes/parse-mongo-id.pipe';

@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Post()
  createStream(@Body() createStreamDto: CreateStreamDto) {
    return this.streamService.createStream(createStreamDto);
  }

  @Get()
  getStreams() {
    return this.streamService.getStreams();
  }

  @Get(':streamId')
  getStream(@Param('streamId', ParseMongoIdPipe) streamId: string) {
    return this.streamService.getStream(streamId);
  }

  @Get('postalcode/:postalcode')
  getStreamsByPostalCode(
    @Param('postalcode', ParseIntPipe) postalCode: number,
  ) {
    return this.streamService.getStreamsByPostalCode(postalCode);
  }

  @Patch(':streamId')
  updateStream(
    @Param('streamId', ParseMongoIdPipe) streamId: string,
    @Body() updateStreamDto: UpdateStreamDto,
  ) {
    return this.streamService.updateStream(streamId, updateStreamDto);
  }

  @Patch(':streamId/container/:containerId')
  addContainer(
    @Param('streamId', ParseMongoIdPipe) streamId: string,
    @Param('containerId', ParseMongoIdPipe) containerId: string,
  ) {
    return this.streamService.addContainer(streamId, containerId);
  }

  @Patch(':streamId/service-provider/:serviceProviderId')
  addServiceProvider(
    @Param('streamId', ParseMongoIdPipe) streamId: string,
    @Param('serviceProviderId', ParseMongoIdPipe) serviceProviderId: string,
  ) {
    return this.streamService.addServiceProvider(streamId, serviceProviderId);
  }

  @Patch(':streamId/postalcode')
  addPostalCode(
    @Param('streamId', ParseMongoIdPipe) streamId: string,
    @Body() addPostalCodeDto: AddPostalCodeDto,
  ) {
    return this.streamService.addPostalCode(streamId, addPostalCodeDto);
  }

  @Patch(':streamId/day')
  addAvailableDay(
    @Param('streamId', ParseMongoIdPipe) streamId: string,
    @Body() addDayDto: AddDayDto,
  ) {
    return this.streamService.addAvailableDay(streamId, addDayDto);
  }

  @Delete(':streamId')
  deleteStream(@Param('streamId', ParseMongoIdPipe) streamId: string) {
    return this.streamService.deleteStream(streamId);
  }
}
