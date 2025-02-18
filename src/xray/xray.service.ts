// src/xray/xray.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Xray, XrayDocument } from './schemas/xray.schema';

@Injectable()
export class XrayService {
  constructor(@InjectModel(Xray.name) private xrayModel: Model<XrayDocument>) {}

  // 📝 ایجاد داده جدید
  async saveXrayData(data: any): Promise<Xray> {
    const { deviceId, time, data: coordinates } = data;
    const dataLength = coordinates.length;
    const dataVolume = JSON.stringify(coordinates).length;

    const newXray = new this.xrayModel({
      deviceId,
      time,
      dataLength,
      dataVolume,
      coordinates,
    });

    return newXray.save();
  }

  // 📊 دریافت همه داده‌ها (با فیلتر)
  async findAll(deviceId?: string): Promise<Xray[]> {
    const filter = deviceId ? { deviceId } : {};
    return this.xrayModel.find(filter).exec();
  }

  // 🔍 دریافت داده با شناسه
  async findById(id: string): Promise<Xray | null> {
    const xray = await this.xrayModel.findById(id).exec();
    if (!xray) {
      throw new NotFoundException(`X-ray data with ID ${id} not found`);
    }
    return xray;
  }

  // ✏️ به‌روزرسانی داده با شناسه
  async updateById(
    id: string,
    updateData: Partial<Xray>,
  ): Promise<Xray | null> {
    const updated = await this.xrayModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).exec();
    if (!updated) {
      throw new NotFoundException(`X-ray data with ID ${id} not found`);
    }
    return updated;
  }

  // 🗑️ حذف داده با شناسه
  async deleteById(id: string): Promise<void> {
    const result = await this.xrayModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`X-ray data with ID ${id} not found`);
    }
  }
}
