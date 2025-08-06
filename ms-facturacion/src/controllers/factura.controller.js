const FacturaService = require('../services/factura.service');

exports.getAllFacturas = async (req, res, next) => {
  try {
    const facturas = await FacturaService.findAll();
    res.status(200).json(facturas);
  } catch (error) {
    next(error);
  }
};

exports.getFacturaById = async (req, res, next) => {
  try {
    const factura = await FacturaService.findById(req.params.id);
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json(factura);
  } catch (error) {
    next(error);
  }
};

exports.getFacturaByCosechaId = async (req, res, next) => {
  try {
    const factura = await FacturaService.findByCosechaId(req.params.cosechaId);
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada para esta cosecha' });
    }
    res.status(200).json(factura);
  } catch (error) {
    next(error);
  }
};

exports.createFactura = async (req, res, next) => {
  try {
    const newFactura = await FacturaService.create(req.body);
    res.status(201).json(newFactura);
  } catch (error) {
    next(error);
  }
};

exports.updateFactura = async (req, res, next) => {
  try {
    const updatedFactura = await FacturaService.update(req.params.id, req.body);
    res.status(200).json(updatedFactura);
  } catch (error) {
    next(error);
  }
};

exports.marcarComoPagada = async (req, res, next) => {
  try {
    const { metodo_pago } = req.body;
    const updatedFactura = await FacturaService.marcarComoPagada(req.params.id, metodo_pago);
    res.status(200).json(updatedFactura);
  } catch (error) {
    next(error);
  }
};

exports.deleteFactura = async (req, res, next) => {
  try {
    await FacturaService.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};