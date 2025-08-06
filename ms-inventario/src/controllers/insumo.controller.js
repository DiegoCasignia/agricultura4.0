const InsumoService = require('../services/insumo.service');

exports.getAllInsumos = async (req, res, next) => {
  try {
    const insumos = await InsumoService.findAll();
    res.status(200).json(insumos);
  } catch (error) {
    next(error);
  }
};

exports.getInsumoById = async (req, res, next) => {
  try {
    const insumo = await InsumoService.findById(req.params.id);
    if (!insumo) {
      return res.status(404).json({ message: 'Insumo no encontrado' });
    }
    res.status(200).json(insumo);
  } catch (error) {
    next(error);
  }
};

exports.createInsumo = async (req, res, next) => {
  try {
    const newInsumo = await InsumoService.create(req.body);
    res.status(201).json(newInsumo);
  } catch (error) {
    next(error);
  }
};

exports.updateInsumo = async (req, res, next) => {
  try {
    const updatedInsumo = await InsumoService.update(req.params.id, req.body);
    res.status(200).json(updatedInsumo);
  } catch (error) {
    next(error);
  }
};

exports.updateStockInsumo = async (req, res, next) => {
  try {
    const { nombre, cantidad } = req.body;
    const updatedInsumo = await InsumoService.updateStock(nombre, cantidad);
    res.status(200).json(updatedInsumo);
  } catch (error) {
    next(error);
  }
};

exports.deleteInsumo = async (req, res, next) => {
  try {
    await InsumoService.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};