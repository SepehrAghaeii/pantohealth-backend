// src/rabbitmq/rabbitmq.module.ts
import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { XrayModule } from '../xray/xray.module';

@Module({
  imports: [XrayModule], // ⚠️ اضافه کردن XrayModule در imports
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
