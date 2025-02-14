// src/xray/xray.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XrayService } from './xray.service';
import { XrayController } from './xray.controller';
import { Xray, XraySchema } from './schemas/xray.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Xray.name, schema: XraySchema }]),
  ],
  controllers: [XrayController],
  providers: [XrayService],
  exports: [XrayService], // ⚠️ اضافه کردن این خط بسیار مهم است
})
export class XrayModule {}
