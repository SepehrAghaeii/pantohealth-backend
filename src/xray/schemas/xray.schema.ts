// src/xray/schemas/xray.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type XrayDocument = HydratedDocument<Xray>;

@Schema({ timestamps: true })
export class Xray {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  dataLength: number;

  @Prop({ required: true })
  dataVolume: number;

  @Prop({ type: Array })
  coordinates: number[][];
}

export const XraySchema = SchemaFactory.createForClass(Xray);
