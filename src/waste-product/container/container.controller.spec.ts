import { Test, TestingModule } from '@nestjs/testing';
import { ContainerController } from './container.controller';
import { ContainerService } from './container.service';
import { getModelToken } from '@nestjs/mongoose';
import { Container } from './container.schema';

const container = {
  name: 'Test container',
  size: 120,
  type: 'Glass',
  isActive: true,
};

describe('ContainerController', () => {
  let controller: ContainerController;
  let containerService: ContainerService;

  const containerModelMock = {
    save: jest.fn().mockResolvedValue(container),
    find: jest.fn().mockResolvedValue([container]),
    findOne: jest.fn().mockResolvedValue(container),
    findById: jest.fn().mockResolvedValue(container),
    findByIdAndUpdate: jest.fn().mockResolvedValue(container),
    findByIdAndRemove: jest.fn().mockResolvedValue(container),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContainerController],
      providers: [
        ContainerService,
        {
          provide: getModelToken(Container.name),
          useValue: containerModelMock,
        },
      ],
    }).compile();

    controller = module.get<ContainerController>(ContainerController);
    containerService = module.get<ContainerService>(ContainerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createContainer', async () => {
    jest
      .spyOn(containerService, 'createContainer')
      .mockResolvedValue(container);

    expect(await controller.createContainer(container)).toBe(
      container,
    );
  });

  it('getContainers', async () => {
    jest
      .spyOn(containerService, 'getContainers')
      .mockResolvedValue([container]);

    const result = await controller.getContainers();

    expect(result.length).toBe(1);
    expect(result[0]).toBe(container);
  });

  it('getContainer', async () => {
    jest
      .spyOn(containerService, 'getContainer')
      .mockResolvedValue(container);

    expect(await controller.getContainer('containerId')).toBe(
      container,
    );
  });

  it('updateContainer', async () => {
    jest
      .spyOn(containerService, 'updateContainer')
      .mockResolvedValue(container);

    expect(
      await controller.updateContainer(
        'containerId',
        container,
      ),
    ).toBe(container);
  });

  it('deleteContainer', async () => {
    jest
      .spyOn(containerService, 'deleteContainer')
      .mockResolvedValue(container);

    expect(await controller.deleteContainer('containerId')).toBe(
      container,
    );
  });
});
