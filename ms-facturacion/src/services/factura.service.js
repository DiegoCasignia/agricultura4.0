const Factura = require('../models/factura.model');

class FacturaService {
  static async findAll() {
    return Factura.findAll();
  }

  static async findById(id) {
    return Factura.findByPk(id);
  }

  static async create(facturaData) {
    return Factura.create(facturaData);
  }

  static async update(id, facturaData) {
    const factura = await Factura.findByPk(id);
    if (!factura) {
      throw new Error('Factura no encontrada');
    }
    return factura.update(facturaData);
  }

  static async delete(id) {
    const factura = await Factura.findByPk(id);
    if (!factura) {
      throw new Error('Factura no encontrada');
    }
    return factura.destroy();
  }

  static async findByCosechaId(cosechaId) {
    return Factura.findOne({ where: { cosecha_id: cosechaId } });
  }

  static async marcarComoPagada(id, metodoPago) {
    const factura = await Factura.findByPk(id);
    if (!factura) {
      throw new Error('Factura no encontrada');
    }
    return factura.update({ 
      pagado: true, 
      fecha_pago: new Date(),
      metodo_pago: metodoPago 
    });
  }
}

module.exports = FacturaService;