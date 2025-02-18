// src/seed/seed.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { XrayService } from '../xray/xray.service';
import * as fs from 'fs';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly xrayService: XrayService) {}

  async importFromJsonFile(filePath: string): Promise<void> {
    try {
      // 1️⃣ خواندن محتوای فایل JSON
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const xrayDataArray = JSON.parse(fileContent);

      // 2️⃣ ثبت هر رکورد در پایگاه داده
      for (const data of xrayDataArray) {
        try {
          await this.xrayService.saveXrayData({
            deviceId: data.deviceId,
            time: data.time,
            data: data.data,
          });
          this.logger.log(`✅ Data for device ${data.deviceId} saved.`);
        } catch (error) {
          this.logger.error(`❌ Failed to save data: ${error.message}`);
        }
      }

      this.logger.log('🎯 All data imported successfully!');
    } catch (error) {
      this.logger.error(`❌ Error reading file: ${error.message}`);
    }
  }
}
