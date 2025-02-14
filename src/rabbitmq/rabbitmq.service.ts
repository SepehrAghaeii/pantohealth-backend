// src/rabbitmq/rabbitmq.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as amqp from 'amqplib';
import { XrayService } from '../xray/xray.service';

@Injectable()
export class RabbitmqService implements OnApplicationBootstrap {
  private channel: amqp.Channel | null = null;
  private readonly queueName = 'xray_queue';

  constructor(private readonly xrayService: XrayService) {}

  async onApplicationBootstrap() {
    await this.connectToRabbitMQ();
  }

  private async connectToRabbitMQ() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });

      console.log(`✅ Connected to RabbitMQ - Listening on ${this.queueName}`);

      this.channel.consume(this.queueName, async (msg) => {
        if (msg) {
          const message = msg.content.toString();
          console.log(`📩 Received X-ray data: ${message}`);

          try {
            const xrayData = JSON.parse(message);
            await this.xrayService.saveXrayData(xrayData);
            console.log('✅ X-ray data saved to MongoDB');
          } catch (error) {
            console.error('❌ Error processing X-ray data:', error.message);
          }

          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('❌ RabbitMQ connection error:', error.message);
    }
  }

  async sendToQueue(message: string) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }
    this.channel.sendToQueue(this.queueName, Buffer.from(message));
  }
}
