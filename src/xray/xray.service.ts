// src/xray/xray.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Xray, XrayDocument } from './schemas/xray.schema';

@Injectable()
export class XrayService {
  constructor(@InjectModel(Xray.name) private xrayModel: Model<XrayDocument>) {}

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
}
