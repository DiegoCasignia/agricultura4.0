const Agricultor = require('../models/agricultor.model');

class AgricultorService {
  static async findAll() {
    return Agricultor.findAll();
  }

  static async findById(id) {
    return Agricultor.findByPk(id);
  }

  static async create(agricultorData) {
    return Agricultor.create(agricultorData);
  }

  static async update(id, agricultorData) {
    const agricultor = await Agricultor.findByPk(id);
    if (!agricultor) {
      throw new Error('Agricultor no encontrado');
    }
    return agricultor.update(agricultorData);
  }

  static async delete(id) {
    const agricultor = await Agricultor.findByPk(id);
    if (!agricultor) {
      throw new Error('Agricultor no encontrado');
    }
    return agricultor.destroy();
  }

  static async exists(id) {
    const count = await Agricultor.count({ where: { id } });
    return count > 0;
  }
}

module.exports = AgricultorService;