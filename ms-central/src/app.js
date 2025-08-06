require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');
const agricultorRoutes = require('./routes/agricultor.routes');
const cosechaRoutes = require('./routes/cosecha.routes');
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Database connection
connectDB();

// RabbitMQ connection
connectRabbitMQ().then(() => {
  console.log('RabbitMQ connected');
}).catch(err => {
  console.error('Failed to connect to RabbitMQ:', err);
});

// Routes
app.use('/agricultores', agricultorRoutes);
app.use('/cosechas', cosechaRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Microservicio Central running on port ${PORT}`);
});

module.exports = app;