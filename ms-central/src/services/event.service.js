const { v4: uuidv4 } = require('uuid');

class EventService {
  static init(channel) {
    this.channel = channel;
  }

  static async publishNewCosechaEvent(cosechaData) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }

    const message = {
      event_id: uuidv4(),
      event_type: 'nueva_cosecha',
      timestamp: new Date().toISOString(),
      payload: {
        cosecha_id: cosechaData.id,
        agricultor_id: cosechaData.agricultor_id,
        producto: cosechaData.producto,
        toneladas: cosechaData.toneladas,
        requiere_insumos: this.getRequiredInsumos(cosechaData.producto),
      },
    };

    await this.channel.publish(
      'cosechas',
      'nueva',
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
  }

  static getRequiredInsumos(producto) {
    // Lógica para determinar insumos requeridos según el producto
    const insumosMap = {
      'Arroz': ['Semilla Arroz L-23', 'Fertilizante N-PK'],
      'Café': ['Semilla Café Arábiga', 'Fertilizante N-PK'],
      'Maíz': ['Semilla Maíz Híbrido', 'Fertilizante N-PK'],
    };

    for (const [key, value] of Object.entries(insumosMap)) {
      if (producto.includes(key)) {
        return value;
      }
    }

    return ['Semilla Genérica', 'Fertilizante Genérico'];
  }
}

module.exports = EventService;