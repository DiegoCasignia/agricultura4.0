const amqp = require('amqplib');
const { RABBITMQ_URL, EXCHANGE_NAME } = process.env;
const EventService = require('../services/event.service');

let connection;
let channel;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    
    // Declare exchange
    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: true });
    
    // Initialize event service
    await EventService.init(channel);
    
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