import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProviderController } from './service-provider.controller';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProvider } from './service-provider.schema';

import { getModelToken } from '@nestjs/mongoose';

const serviceProvider = {
  name: 'Test Service Provider',
  isActive: true,
};

describe('ServiceProviderController', () => {
  let controller: ServiceProviderController;
  let serviceProviderService: ServiceProviderService;

  const serviceProviderModelMock = {
    save: jest.fn().mockResolvedValue(serviceProvider),
    find: jest.fn().mockResolvedValue([serviceProvider]),
    findOne: jest.fn().mockResolvedValue(serviceProvider),
    findById: jest.fn().mockResolvedValue(serviceProvider),
    findByIdAndUpdate: jest.fn().mockResolvedValue(serviceProvider),
    findByIdAndRemove: jest.fn().mockResolvedValue(serviceProvider),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceProviderController],
      providers: [
        ServiceProviderService,
        {
          provide: getModelToken(ServiceProvider.name),
          useValue: serviceProviderModelMock,
        },
      ],
    }).compile();

    serviceProviderService = module.get<ServiceProviderService>(
      ServiceProviderService,
    );
    controller = module.get<ServiceProviderController>(
      ServiceProviderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createServiceProvider', async () => {
    jest
      .spyOn(serviceProviderService, 'createServiceProvider')
      .mockResolvedValue(serviceProvider);

    expect(await controller.createServiceProvider(serviceProvider)).toBe(
      serviceProvider,
    );
  });

  it('getServiceProviders', async () => {
    jest
      .spyOn(serviceProviderService, 'getServiceProviders')
      .mockResolvedValue([serviceProvider]);

    const result = await controller.getServiceProviders();

    expect(result.length).toBe(1);
    expect(result[0]).toBe(serviceProvider);
  });

  it('getServiceProvider', async () => {
    jest
      .spyOn(serviceProviderService, 'getServiceProvider')
      .mockResolvedValue(serviceProvider);

    expect(await controller.getServiceProvider('serviceProviderId')).toBe(
      serviceProvider,
    );
  });

  it('updateServiceProvider', async () => {
    jest
      .spyOn(serviceProviderService, 'updateServiceProvider')
      .mockResolvedValue(serviceProvider);

    expect(
      await controller.updateServiceProvider(
        'serviceProviderId',
        serviceProvider,
      ),
    ).toBe(serviceProvider);
  });

  it('deleteServiceProvider', async () => {
    jest
      .spyOn(serviceProviderService, 'deleteServiceProvider')
      .mockResolvedValue(serviceProvider);

    expect(await controller.deleteServiceProvider('serviceProviderId')).toBe(
      serviceProvider,
    );
  });
});
