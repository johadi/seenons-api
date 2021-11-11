import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateContainerDto } from './dto/create-container.dto';
import { UpdateContainerDto } from './dto/update-container.dto';
import { Container, ContainerDocument } from './container.schema';

@Injectable()
export class ContainerService {
  constructor(
    @InjectModel(Container.name)
    private containerModel: Model<ContainerDocument>,
  ) {}
  async createContainer(
    createContainerDto: CreateContainerDto,
  ): Promise<Container> {
    await this.checkExistingContainerByName(createContainerDto.name);

    const container = new this.containerModel(createContainerDto);
    return container.save();
  }

  getContainers(): Promise<Container[]> {
    return this.containerModel.find().exec();
  }

  async getContainer(containerId: string): Promise<Container> {
    const container = await this.containerModel.findById(containerId);
    if (!container) {
      throw new HttpException(
        'Container with this ID not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    return container;
  }

  async updateContainer(
    containerId: string,
    updateContainerDto: UpdateContainerDto,
  ): Promise<Container> {
    const container = await this.getContainer(containerId);

    // Check duplicate if user is updating a name other than this document name
    if (updateContainerDto.name && updateContainerDto.name !== container.name) {
      await this.checkExistingContainerByName(updateContainerDto.name);
    }

    return this.containerModel
      .findByIdAndUpdate(containerId, updateContainerDto, {
        new: true,
      })
      .exec();
  }

  async deleteContainer(containerId: string): Promise<Container> {
    await this.getContainer(containerId);

    return this.containerModel.findByIdAndRemove(containerId).exec();
  }

  private async checkExistingContainerByName(name) {
    const existingContainer = await this.containerModel.findOne({ name });

    if (existingContainer) {
      throw new HttpException(
        'Container with this name already exists.',
        HttpStatus.CONFLICT,
      );
    }
  }
}
