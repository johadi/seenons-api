import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import {
  ServiceProvider,
  ServiceProviderDocument,
} from './service-provider.schema';
import { Model } from 'mongoose';

@Injectable()
export class ServiceProviderService {
  constructor(
    @InjectModel(ServiceProvider.name)
    private serviceProviderModel: Model<ServiceProviderDocument>,
  ) {}

  async createServiceProvider(
    createServiceProviderDto: CreateServiceProviderDto,
  ): Promise<ServiceProvider> {
    await this.checkExistingServiceProviderByName(
      createServiceProviderDto.name,
    );

    const serviceProvider = new this.serviceProviderModel(
      createServiceProviderDto,
    );

    return serviceProvider.save();
  }

  getServiceProviders(): Promise<ServiceProvider[]> {
    return this.serviceProviderModel.find().exec();
  }

  async getServiceProvider(
    serviceProviderId: string,
  ): Promise<ServiceProvider> {
    const serviceProvider = await this.serviceProviderModel.findById(
      serviceProviderId,
    );
    if (!serviceProvider) {
      throw new HttpException(
        'Service Provider with this ID not found.',
        HttpStatus.NOT_FOUND,
      );
    }

    return serviceProvider;
  }

  async updateServiceProvider(
    serviceProviderId: string,
    updateServiceProviderDto: UpdateServiceProviderDto,
  ): Promise<ServiceProvider> {
    const serviceProvider = await this.getServiceProvider(serviceProviderId);

    // Check duplicate if user is updating a name other than this document name
    if (
      updateServiceProviderDto.name &&
      updateServiceProviderDto.name !== serviceProvider.name
    ) {
      await this.checkExistingServiceProviderByName(
        updateServiceProviderDto.name,
      );
    }

    return this.serviceProviderModel
      .findByIdAndUpdate(serviceProviderId, updateServiceProviderDto, {
        new: true,
      })
      .exec();
  }

  async deleteServiceProvider(
    serviceProviderId: string,
  ): Promise<ServiceProvider> {
    await this.getServiceProvider(serviceProviderId);

    return this.serviceProviderModel
      .findByIdAndRemove(serviceProviderId)
      .exec();
  }

  async checkExistingServiceProviderByName(name) {
    const existingServiceProvider = await this.serviceProviderModel.findOne({
      name,
    });

    if (existingServiceProvider) {
      throw new HttpException(
        'Service provider with this name already exists.',
        HttpStatus.CONFLICT,
      );
    }
  }
}
