import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WasteProductModule } from './waste-product/waste-product.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/seenons'),
    WasteProductModule,
    ServiceProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
