// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { XrayModule } from './xray/xray.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pantohealth'),
    RabbitmqModule,
    XrayModule,
  ],
})
export class AppModule {}
