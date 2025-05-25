import { Kafka } from 'kafkajs';

async function produce() {
  const kafka = new Kafka({
    clientId: 'X-producer',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'playlist_sharing',
    messages: [
      { value: JSON.stringify({ user_id: 3, content: 'Playlist partagee !' }) },
    ],
  });

  await producer.disconnect();
  console.log('Message envoyé');
}

produce();
