// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.init(); // اطمینان از راه‌اندازی کامل برنامه

  const rabbitService = app.get(RabbitmqService);

  const sampleData = JSON.stringify({
    deviceId: 'test123',
    time: Date.now(),
    data: [[100, [51.33, 12.33, 1.2]]],
  });

  // ارسال داده به صف پس از آماده‌شدن کانال
  await rabbitService.sendToQueue(sampleData);
  console.log('🚀 Sent sample X-ray data to RabbitMQ');

  await app.listen(3000);
}
bootstrap();
