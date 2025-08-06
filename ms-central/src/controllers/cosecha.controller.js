const CosechaService = require('../services/cosecha.service');

exports.getAllCosechas = async (req, res, next) => {
  try {
    const cosechas = await CosechaService.findAll();
    res.status(200).json(cosechas);
  } catch (error) {
    next(error);
  }
};

exports.getCosechaById = async (req, res, next) => {
  try {
    const cosecha = await CosechaService.findById(req.params.id);
    if (!cosecha) {
      return res.status(404).json({ message: 'Cosecha no encontrada' });
    }
    res.status(200).json(cosecha);
  } catch (error) {
    next(error);
  }
};

exports.createCosecha = async (req, res, next) => {
  try {
    const newCosecha = await CosechaService.create(req.body);
    res.status(201).json(newCosecha);
  } catch (error) {
    next(error);
  }
};

exports.updateCosecha = async (req, res, next) => {
  try {
    const updatedCosecha = await CosechaService.update(req.params.id, req.body);
    res.status(200).json(updatedCosecha);
  } catch (error) {
    next(error);
  }
};

exports.updateEstadoCosecha = async (req, res, next) => {
  try {
    const { estado } = req.body;
    const updatedCosecha = await CosechaService.updateEstado(req.params.id, estado);
    res.status(200).json(updatedCosecha);
  } catch (error) {
    next(error);
  }
};

exports.deleteCosecha = async (req, res, next) => {
  try {
    await CosechaService.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};