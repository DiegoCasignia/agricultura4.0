const Cosecha = require('../models/cosecha.model');
const AgricultorService = require('./agricultor.service');
const EventService = require('./event.service');

class CosechaService {
  static async findAll() {
    return Cosecha.findAll();
  }

  static async findById(id) {
    return Cosecha.findByPk(id);
  }

  static async create(cosechaData) {
    // Validar que el agricultor existe
    const agricultorExists = await AgricultorService.exists(cosechaData.agricultor_id);
    if (!agricultorExists) {
      throw new Error('Agricultor no encontrado');
    }

    // Validar toneladas
    if (cosechaData.toneladas <= 0) {
      throw new Error('Las toneladas deben ser mayores a 0');
    }

    const cosecha = await Cosecha.create(cosechaData);

    // Publicar evento de nueva cosecha
    await EventService.publishNewCosechaEvent(cosecha);

    return cosecha;
  }

  static async update(id, cosechaData) {
    const cosecha = await Cosecha.findByPk(id);
    if (!cosecha) {
      throw new Error('Cosecha no encontrada');
    }

    // Validar agricultor si se está actualizando
    if (cosechaData.agricultor_id) {
      const agricultorExists = await AgricultorService.exists(cosechaData.agricultor_id);
      if (!agricultorExists) {
        throw new Error('Agricultor no encontrado');
      }
    }

    return cosecha.update(cosechaData);
  }

  static async updateEstado(id, estado) {
    const cosecha = await Cosecha.findByPk(id);
    if (!cosecha) {
      throw new Error('Cosecha no encontrada');
    }
    return cosecha.update({ estado });
  }

  static async delete(id) {
    const cosecha = await Cosecha.findByPk(id);
    if (!cosecha) {
      throw new Error('Cosecha no encontrada');
    }
    return cosecha.destroy();
  }
}

module.exports = CosechaService;