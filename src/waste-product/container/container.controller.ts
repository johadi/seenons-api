import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { ParseMongoIdPipe } from '../../pipes/parse-mongo-id.pipe';

@Controller('containers')
export class ContainerController {
  constructor(private readonly containerService: ContainerService) {}

  @Post()
  createContainer(@Body() createContainerDto: CreateContainerDto) {
    return this.containerService.createContainer(createContainerDto);
  }

  @Get()
  getContainers() {
    return this.containerService.getContainers();
  }

  @Get(':containerId')
  getContainer(@Param('containerId', ParseMongoIdPipe) containerId: string) {
    return this.containerService.getContainer(containerId);
  }

  @Patch(':containerId')
  updateContainer(
    @Param('containerId', ParseMongoIdPipe) containerId: string,
    @Body() updateContainerDto: UpdateContainerDto,
  ) {
    return this.containerService.updateContainer(
      containerId,
      updateContainerDto,
    );
  }

  @Delete(':containerId')
  deleteContainer(@Param('containerId', ParseMongoIdPipe) containerId: string) {
    return this.containerService.deleteContainer(containerId);
  }
}
