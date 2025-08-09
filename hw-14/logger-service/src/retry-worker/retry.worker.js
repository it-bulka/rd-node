const { parentPort } = require('node:worker_threads');
const Redis = require('ioredis');
const { Kafka } = require('kafkajs');

const redis = new Redis({
  host: 'localhost',
  port: 6379,
  name: 'RetryWorker',
});

const kafka = new Kafka({
  clientId: 'retry-worker',
  brokers: ['localhost:9092'],
});
const producer = kafka.producer();

(async () => {
  await producer.connect();
  console.log('[RetryWorker] Connected to Kafka');

  const streamName = 'events.notifications';
  console.log(`[RetryWorker] Listening to Redis Stream: ${streamName}`);

  while (true) {
    const streams = await redis.xread(
      'BLOCK', 0,
      'STREAMS', streamName,
      '$'
    );

    if (!streams) continue;

    const [_stream, messages] = streams[0];

    for (const [id, fields] of messages) {
      const event = JSON.parse(fields[1]);
      const data = JSON.parse(fields[3]);
      console.log('[RetryWorker] Got message from Redis:', id, data);

      try {
        await producer.send({
          topic: 'events.notifications',
          messages: [{ value: JSON.stringify({ event, data }) }],
        });
        console.log('[RetryWorker] Sent to Kafka:', event);
        await redis.xdel(streamName, id);
      } catch (err) {
        console.error('[RetryWorker] Failed to send to Kafka:', err.message);
      }
    }
  }
})();
