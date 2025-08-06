require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');
const insumoRoutes = require('./routes/insumo.routes');
const ConsumerService = require('./services/consumer.service');
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(express.json());

// Database connection
connectDB();

// RabbitMQ connection and start consuming
connectRabbitMQ().then(async () => {
  console.log('RabbitMQ connected');
  await ConsumerService.start();
}).catch(err => {
  console.error('Failed to connect to RabbitMQ:', err);
});

// Routes
app.use('/insumos', insumoRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Microservicio Inventario running on port ${PORT}`);
});

module.exports = app;