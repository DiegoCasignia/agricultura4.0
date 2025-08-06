const amqp = require('amqplib');
const { RABBITMQ_URL, QUEUE_NAME } = process.env;

let connection;
let channel;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    
    // Declare queue
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    
    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
};

const getChannel = () => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');
  return channel;
};

module.exports = { connectRabbitMQ, getChannel };