import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { ParseMongoIdPipe } from '../pipes/parse-mongo-id.pipe';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(
    private readonly serviceProviderService: ServiceProviderService,
  ) {}

  @Post()
  createServiceProvider(
    @Body() createServiceProviderDto: CreateServiceProviderDto,
  ) {
    return this.serviceProviderService.createServiceProvider(
      createServiceProviderDto,
    );
  }

  @Get()
  getServiceProviders() {
    return this.serviceProviderService.getServiceProviders();
  }

  @Get(':serviceProviderId')
  getServiceProvider(
    @Param('serviceProviderId', ParseMongoIdPipe) serviceProviderId: string,
  ) {
    return this.serviceProviderService.getServiceProvider(serviceProviderId);
  }

  @Patch(':serviceProviderId')
  updateServiceProvider(
    @Param('serviceProviderId', ParseMongoIdPipe) serviceProviderId: string,
    @Body() updateServiceProviderDto: UpdateServiceProviderDto,
  ) {
    return this.serviceProviderService.updateServiceProvider(
      serviceProviderId,
      updateServiceProviderDto,
    );
  }

  @Delete(':serviceProviderId')
  deleteServiceProvider(
    @Param('serviceProviderId', ParseMongoIdPipe) serviceProviderId: string,
  ) {
    return this.serviceProviderService.deleteServiceProvider(serviceProviderId);
  }
}
