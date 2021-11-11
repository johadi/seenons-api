import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WasteProductModule } from './waste-product/waste-product.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    WasteProductModule,
    ServiceProviderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
