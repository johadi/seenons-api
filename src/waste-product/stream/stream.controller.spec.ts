import { Test, TestingModule } from '@nestjs/testing';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { getModelToken } from '@nestjs/mongoose';
import { Stream, StreamDocument } from './stream.schema';
import { Container } from '../container/container.schema';
import { ServiceProvider } from '../../service-provider/service-provider.schema';
import { Document } from 'mongoose';

const stream = {
  name: 'Test Stream',
  description: 'Test Description',
  unitWeight: 4,
  type: 'SomeType',
  containers: ['container'],
  serviceProviders: ['serviceProvider'],
  postalCodes: [34563],
  availableDays: [{ day: 1, timeslots: ['1PM', '2PM'] }],
  isActive: true,
};

describe('StreamController', () => {
  let controller: StreamController;
  let streamService: StreamService;

  const modelMock = {
    save: jest.fn().mockResolvedValue(stream),
    find: jest.fn().mockResolvedValue([stream]),
    findOne: jest.fn().mockResolvedValue(stream),
    findById: jest.fn().mockResolvedValue(stream),
    findByIdAndUpdate: jest.fn().mockResolvedValue(stream),
    findByIdAndRemove: jest.fn().mockResolvedValue(stream),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamController],
      providers: [
        StreamService,
        {
          provide: getModelToken(Stream.name),
          useValue: modelMock,
        },
        {
          provide: getModelToken(Container.name),
          useValue: modelMock,
        },
        {
          provide: getModelToken(ServiceProvider.name),
          useValue: modelMock,
        },
      ],
    }).compile();

    streamService = module.get<StreamService>(StreamService);
    controller = module.get<StreamController>(StreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createStream', async () => {
    jest.spyOn(streamService, 'createStream').mockResolvedValue(stream);

    expect(await controller.createStream(stream)).toBe(stream);
  });

  it('getStreams', async () => {
    jest.spyOn(streamService, 'getStreams').mockResolvedValue([stream]);

    const result = await controller.getStreams();

    expect(result.length).toBe(1);
    expect(result[0]).toBe(stream);
  });

  it('getStream', async () => {
    jest.spyOn(streamService, 'getStream').mockResolvedValue(stream as any);

    expect(await controller.getStream('streamId')).toBe(stream);
  });

  it('updateStream', async () => {
    jest.spyOn(streamService, 'updateStream').mockResolvedValue(stream);

    expect(await controller.updateStream('streamId', stream)).toBe(stream);
  });

  it('deleteStream', async () => {
    jest.spyOn(streamService, 'deleteStream').mockResolvedValue(stream);

    expect(await controller.deleteStream('streamId')).toBe(stream);
  });

  //
  it('getStreamsByPostalCode', async () => {
    jest
      .spyOn(streamService, 'getStreamsByPostalCode')
      .mockResolvedValue([stream]);

    const result = await controller.getStreamsByPostalCode(56543);

    expect(result.length).toBe(1);
    expect(result[0]).toBe(stream);
  });

  it('addContainer', async () => {
    jest.spyOn(streamService, 'addContainer').mockResolvedValue(stream);

    expect(await controller.addContainer('streamId', 'containerId')).toBe(
      stream,
    );
  });

  it('addServiceProvider', async () => {
    jest.spyOn(streamService, 'addServiceProvider').mockResolvedValue(stream);

    expect(
      await controller.addServiceProvider('streamId', 'serviceProviderId'),
    ).toBe(stream);
  });

  it('addPostalCode', async () => {
    jest.spyOn(streamService, 'addPostalCode').mockResolvedValue(stream);

    expect(
      await controller.addPostalCode('streamId', { postalCode: 49503 }),
    ).toBe(stream);
  });
  it('addAvailableDay', async () => {
    jest.spyOn(streamService, 'addAvailableDay').mockResolvedValue(stream);

    expect(
      await controller.addAvailableDay('streamId', {
        day: 3,
        timeslots: ['9AM', '1PM'],
      }),
    ).toBe(stream);
  });
});
