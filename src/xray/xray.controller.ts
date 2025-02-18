// src/xray/xray.controller.ts
import { Controller, Get, Post, Body, Param, Query, Patch, Delete } from '@nestjs/common';
import { XrayService } from './xray.service';
import { Xray } from './schemas/xray.schema';

@Controller('xray')
export class XrayController {
  constructor(private readonly xrayService: XrayService) {}

  // 📝 POST: ایجاد داده جدید
  @Post()
  async create(@Body() body: any): Promise<Xray> {
    return this.xrayService.saveXrayData(body);
  }

  // 📊 GET: دریافت همه داده‌ها (با قابلیت فیلتر)
  @Get()
  async findAll(@Query('deviceId') deviceId?: string): Promise<Xray[]> {
    return this.xrayService.findAll(deviceId);
  }

  // 🔍 GET: دریافت داده با شناسه
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Xray | null> {
    return this.xrayService.findById(id);
  }

  // ✏️ PATCH: به‌روزرسانی داده
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Xray>,
  ): Promise<Xray | null> {
    return this.xrayService.updateById(id, updateData);
  }

  // 🗑️ DELETE: حذف داده با شناسه
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.xrayService.deleteById(id);
    return { message: 'X-ray data deleted successfully' };
  }
}
