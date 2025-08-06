const Insumo = require('../models/insumo.model');

class InsumoService {
  static async findAll() {
    return Insumo.findAll();
  }

  static async findById(id) {
    return Insumo.findByPk(id);
  }

  static async create(insumoData) {
    return Insumo.create(insumoData);
  }

  static async update(id, insumoData) {
    const insumo = await Insumo.findByPk(id);
    if (!insumo) {
      throw new Error('Insumo no encontrado');
    }
    return insumo.update(insumoData);
  }

  static async delete(id) {
    const insumo = await Insumo.findByPk(id);
    if (!insumo) {
      throw new Error('Insumo no encontrado');
    }
    return insumo.destroy();
  }

  static async updateStock(nombreInsumo, cantidad) {
    const transaction = await Insumo.sequelize.transaction();
    
    try {
      const insumo = await Insumo.findOne({
        where: { nombre_insumo: nombreInsumo },
        transaction
      });

      if (!insumo) {
        throw new Error(`Insumo ${nombreInsumo} no encontrado`);
      }

      const nuevoStock = insumo.stock + cantidad;
      
      if (nuevoStock < 0) {
        throw new Error(`Stock insuficiente para ${nombreInsumo}`);
      }

      const [affectedRows] = await Insumo.update(
        { stock: nuevoStock },
        { 
          where: { 
            nombre_insumo: nombreInsumo,
            version: insumo.version // Para bloqueo optimista
          },
          transaction
        }
      );

      if (affectedRows === 0) {
        throw new Error('Conflicto de concurrencia al actualizar stock');
      }

      await transaction.commit();
      return await Insumo.findOne({ where: { nombre_insumo: nombreInsumo } });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = InsumoService;