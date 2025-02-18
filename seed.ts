// seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { SeedService } from './src/seed/seed.service';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  const filePath = './xray.json'; // مسیر فایل
  await seedService.importFromJsonFile(filePath);

  await app.close();
}

runSeed().catch((error) => {
  console.error('❌ Seed failed:', error);
});
