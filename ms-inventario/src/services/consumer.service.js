const amqp = require('amqplib');
const { getChannel } = require('../config/rabbitmq');
const { QUEUE_NAME } = process.env;
const InsumoService = require('./insumo.service');

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
            }
            
            channel.ack(msg);
          } catch (error) {
            console.error('Error processing message:', error);
            channel.nack(msg, false, false); // Descarta el mensaje fallido
          }
        }
      });
    } catch (error) {
      console.error('Error starting consumer:', error);
      throw error;
    }
  }

  static async processNuevaCosecha(payload) {
    const { cosecha_id, producto, toneladas, requiere_insumos } = payload;
    
    if (!requiere_insumos || requiere_insumos.length === 0) {
      console.log(`No se requieren insumos para ${producto}`);
      return;
    }
    
    // Calcular insumos necesarios según el tipo de producto
    let insumosAjustados = [];
    
    if (producto.includes('Arroz')) {
      const semillaNecesaria = toneladas * 5; // 5kg por tonelada
      const fertilizanteNecesario = toneladas * 2; // 2kg por tonelada
      
      insumosAjustados = [
        { nombre: 'Semilla Arroz L-23', cantidad: -semillaNecesaria },
        { nombre: 'Fertilizante N-PK', cantidad: -fertilizanteNecesario }
      ];
    } else if (producto.includes('Café')) {
      const semillaNecesaria = toneladas * 3; // 3kg por tonelada
      const fertilizanteNecesario = toneladas * 1.5; // 1.5kg por tonelada
      
      insumosAjustados = [
        { nombre: 'Semilla Café Arábiga', cantidad: -semillaNecesaria },
        { nombre: 'Fertilizante N-PK', cantidad: -fertilizanteNecesario }
      ];
    }
    
    // Ajustar stock para cada insumo
    for (const insumo of insumosAjustados) {
      try {
        await InsumoService.updateStock(insumo.nombre, insumo.cantidad);
        console.log(`Stock actualizado para ${insumo.nombre}`);
      } catch (error) {
        console.error(`Error actualizando stock para ${insumo.nombre}:`, error.message);
        throw error;
      }
    }
    
    // Publicar confirmación (opcional)
    await this.publishConfirmation(cosecha_id);
  }

  static async publishConfirmation(cosechaId) {
    try {
      const channel = getChannel();
      
      const confirmation = {
        event_id: require('uuid').v4(),
        event_type: 'inventario_ajustado',
        timestamp: new Date().toISOString(),
        payload: {
          cosecha_id: cosechaId,
          status: 'OK',
        },
      };
      
      await channel.publish(
        '',
        'cola_facturacion',
        Buffer.from(JSON.stringify(confirmation)),
        { persistent: true }
      );
      
      console.log('Confirmación enviada a cola_facturacion');
    } catch (error) {
      console.error('Error enviando confirmación:', error);
      throw error;
    }
  }
}

module.exports = ConsumerService;