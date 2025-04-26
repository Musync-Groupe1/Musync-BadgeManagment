import { Kafka } from 'kafkajs';

async function produce() {
  const kafka = new Kafka({
    clientId: 'comment-producer',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'new_comment',
    messages: [
      {
        value: JSON.stringify({ user_id: 1, content: 'Nouveau Comentaire !' }),
      },
    ],
  });

  await producer.disconnect();
  console.log('Message envoyé');
}

produce();
