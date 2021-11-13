import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { Stream, StreamDocument } from './stream.schema';
import { Container, ContainerDocument } from '../container/container.schema';
import {
  ServiceProvider,
  ServiceProviderDocument,
} from '../../service-provider/service-provider.schema';
import { AddPostalCodeDto } from './dto/add-postalcode.dto';
import { AddDayDto } from './dto/add-day.dto';

@Injectable()
export class StreamService {
  constructor(
    @InjectModel(Stream.name) private streamModel: Model<StreamDocument>,
    @InjectModel(Container.name)
    private containerModel: Model<ContainerDocument>,
    @InjectModel(ServiceProvider.name)
    private serviceProviderModel: Model<ServiceProviderDocument>,
  ) {}

  async createStream(createStreamDto: CreateStreamDto): Promise<Stream> {
    await this.checkExistingStreamByName(createStreamDto.name);

    const stream = new this.streamModel(createStreamDto);
    return stream.save();
  }

  getStreams(): Promise<Stream[]> {
    return this.streamModel.find().exec();
  }

  async getStream(streamId: string): Promise<StreamDocument> {
    const stream = await this.streamModel.findById(streamId);
    if (!stream) {
      throw new HttpException(
        'Stream with this ID not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    return stream;
  }

  async updateStream(
    streamId: string,
    updateStreamDto: UpdateStreamDto,
  ): Promise<Stream> {
    const stream = await this.getStream(streamId);

    // Check duplicate if user is updating a name other than this document name
    if (updateStreamDto.name && updateStreamDto.name !== stream.name) {
      await this.checkExistingStreamByName(updateStreamDto.name);
    }

    return this.streamModel
      .findByIdAndUpdate(streamId, updateStreamDto, {
        new: true,
      })
      .exec();
  }

  async deleteStream(streamId: string): Promise<Stream> {
    await this.getStream(streamId);

    return this.streamModel.findByIdAndRemove(streamId).exec();
  }

  getStreamsByPostalCode(postalCode: number): Promise<Stream[]> {
    return this.streamModel
      .find({ postalCodes: postalCode })
      .select('-__v')
      .populate('containers', '-__v')
      .populate('serviceProviders', '-__v')
      .exec();
  }

  async addContainer(streamId: string, containerId: string): Promise<Stream> {
    const foundContainer = await this.containerModel.findById(containerId);
    if (!foundContainer) {
      throw new HttpException(
        'Container with this ID not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.updateStreamField(streamId, 'containers', containerId);
  }

  async addServiceProvider(
    streamId: string,
    serviceProviderId: string,
  ): Promise<Stream> {
    const foundServiceProvider = await this.serviceProviderModel.findById(
      serviceProviderId,
    );
    if (!foundServiceProvider) {
      throw new HttpException(
        'Service provider with this ID not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.updateStreamField(
      streamId,
      'serviceProviders',
      serviceProviderId,
    );
  }

  async addPostalCode(
    streamId: string,
    addPostalCodeDto: AddPostalCodeDto,
  ): Promise<Stream> {
    return this.updateStreamField(
      streamId,
      'postalCodes',
      addPostalCodeDto.postalCode,
    );
  }

  async addAvailableDay(
    streamId: string,
    addDayDto: AddDayDto,
  ): Promise<Stream> {
    return this.updateStreamField(streamId, 'availableDays', addDayDto, 'day');
  }

  private async checkExistingStreamByName(name: string) {
    const existingStream = await this.streamModel.findOne({ name });

    if (existingStream) {
      throw new HttpException(
        'Stream with this name already exists.',
        HttpStatus.CONFLICT,
      );
    }
  }

  private async updateStreamField<T, K extends keyof T>(
    streamId: string,
    field: string,
    newValue: T,
    objectComparisonKey?: K,
  ) {
    const stream = await this.getStream(streamId);

    // Check if value exists before updating
    this.checkIfValueExists(stream[field], newValue, objectComparisonKey);

    stream[field].push(newValue);
    return stream.save();
  }

  // Check if a value exist in an array
  private checkIfValueExists<T, K extends keyof T>(
    values: T[],
    newValue: T,
    objectComparisonKey?: K,
  ) {
    let hasExistingValue: boolean;
    let errorMessage: string;

    // In case the value is an object
    if (typeof newValue === 'object' && objectComparisonKey) {
      hasExistingValue = values.some((existingValue) => {
        return (
          existingValue[objectComparisonKey] === newValue[objectComparisonKey]
        );
      });
      errorMessage = `You can\'t add ${newValue[objectComparisonKey]} because it was already added.`;
    } else {
      // otherwise
      hasExistingValue = values.includes(newValue);
      errorMessage = ` You can\'t add ${newValue} because it was already added.`;
    }

    if (hasExistingValue) {
      throw new HttpException(errorMessage, HttpStatus.CONFLICT);
    }
  }
}
