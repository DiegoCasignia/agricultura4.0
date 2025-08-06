const amqp = require('amqplib');
const { getChannel } = require('../config/rabbitmq');
const { QUEUE_NAME, CENTRAL_SERVICE_URL } = process.env;
const FacturaService = require('./factura.service');
const axios = require('axios');

class ConsumerService {
  static async start() {
    try {
      const channel = getChannel();
      
      console.log(`Waiting for messages in ${QUEUE_NAME}`);
      
      channel.consume(QUEUE_NAME, async (msg) => {
        if (msg !== null) {
          try {
            const message = JSON.parse(msg.content.toString());
            console.log('Received:', message);
            
            if (message.event_type === 'nueva_cosecha') {
              await this.processNuevaCosecha(message.payload);
            } else if (message.event_type === 'inventario_ajustado') {
              console.log('Inventario ajustado confirmado:', message.payload);
            }
            
            channel.ack(msg);
          } catch (error) {
            console.error('Error processing message:', error);
            channel.nack(msg, false, true); // Reintentar el mensaje
          }
        }
      });
    } catch (error) {
      console.error('Error starting consumer:', error);
      throw error;
    }
  }

  static async processNuevaCosecha(payload) {
    const { cosecha_id, producto, toneladas } = payload;
    
    // Verificar si ya existe una factura para esta cosecha
    const facturaExistente = await FacturaService.findByCosechaId(cosecha_id);
    if (facturaExistente) {
      console.log('Factura ya existe para esta cosecha:', cosecha_id);
      return;
    }
    
    // Calcular monto según el producto
    const PRECIOS = {
      'Arroz': 120,
      'Arroz Oro': 150,
      'Café': 300,
      'Café Premium': 450,
      'Maíz': 80,
    };
    
    // Buscar el precio más específico primero
    let precioUnitario = 100; // Precio por defecto
    for (const [key, value] of Object.entries(PRECIOS)) {
      if (producto.includes(key)) {
        precioUnitario = value;
        break;
      }
    }
    
    const monto = toneladas * precioUnitario;
    
    // Crear factura
    const factura = await FacturaService.create({
      cosecha_id,
      monto,
      pagado: false,
    });
    
    console.log('Factura creada:', factura.id);
    
    // Notificar al microservicio central
    await this.notificarCentral(cosecha_id, factura.id);
  }

  static async notificarCentral(cosechaId, facturaId) {
    try {
      const response = await axios.put(
        `${CENTRAL_SERVICE_URL}/cosechas/${cosechaId}/estado`,
        {
          estado: 'FACTURADA',
          factura_id: facturaId,
        }
      );
      
      console.log('Estado actualizado en Central:', response.data);
    } catch (error) {
      console.error('Error notificando al servicio central:', error.message);
      
      // Reintentar lógica podría ir aquí
      throw error;
    }
  }
}

module.exports = ConsumerService;