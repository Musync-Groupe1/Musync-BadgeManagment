// import { Injectable, OnModuleInit } from '@nestjs/common';

// import {
//   Consumer,
//   ConsumerRunConfig,
//   Kafka,
//   Producer,
//   ProducerRecord,
// } from 'kafkajs';

// @Injectable()
// export class KafkaService implements OnModuleInit {
//   private kafka: Kafka;

//   private producer: Producer;

//   private consumers: Map<string, Consumer> = new Map();

//   constructor() {
//     this.kafka = new Kafka({
//       clientId: 'badge-service',

//       brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
//     });

//     this.producer = this.kafka.producer();
//   }

//   async onModuleInit() {
//     await this.producer.connect();

//     console.log('Kafka producer connected');
//   }

//   async produce(topic: string, message: any) {
//     const record: ProducerRecord = {
//       topic: topic,

//       messages: [{ value: JSON.stringify(message) }],
//     };

//     await this.producer.send(record);

//     console.log(`Message sent to topic ${topic}:`, message);
//   }

//   async consume(
//     topic: string,
//     groupId: string,
//     callback: (message: any) => void,
//   ) {
//     if (this.consumers.has(topic)) {
//       console.log(`Consumer for topic ${topic} already exists`);

//       return;
//     }

//     const consumer = this.kafka.consumer({ groupId });

//     await consumer.connect();

//     await consumer.subscribe({ topic, fromBeginning: true });

//     const runConfig: ConsumerRunConfig = {
//       eachMessage: async ({ topic, partition, message }) => {
//         const parsedMessage = JSON.parse(message.value?.toString() || '{}');

//         callback(parsedMessage);
//       },
//     };

//     await consumer.run(runConfig);

//     this.consumers.set(topic, consumer);

//     console.log(`Consumer for topic ${topic} started`);
//   }

//   async onApplicationShutdown() {
//     await this.producer.disconnect();

//     console.log('Kafka producer disconnected');

//     for (const consumer of this.consumers.values()) {
//       await consumer.disconnect();

//       console.log('Kafka consumer disconnected');
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { Kafka, Consumer, ConsumerRunConfig, KafkaMessage } from 'kafkajs';

@Injectable()
export class ConsumerService {
  private kafka: Kafka;
  private consumers: Map<string, Consumer> = new Map();

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });
  }

  async consume({
    topic,
    config,
    onMessage,
  }: {
    topic: { topic: string };
    config: { groupId: string };
    //onMessage: Function;
    onMessage: (message: KafkaMessage) => Promise<void>;
  }) {
    const consumer = this.kafka.consumer({ groupId: config.groupId });

    await consumer.connect();
    await consumer.subscribe({ topic: topic.topic, fromBeginning: true });

    const runConfig: ConsumerRunConfig = {
      eachMessage: async ({ message }) => {
        await onMessage(message);
      },
    };

    await consumer.run(runConfig);

    this.consumers.set(topic.topic, consumer);

    console.log(`Consumer for topic ${topic.topic} started`);
  }

  async disconnect() {
    for (const consumer of this.consumers.values()) {
      await consumer.disconnect();
      console.log('Kafka consumer disconnected');
    }
  }
}
