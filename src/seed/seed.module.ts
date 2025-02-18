// src/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { XrayModule } from '../xray/xray.module';

@Module({
  imports: [XrayModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
