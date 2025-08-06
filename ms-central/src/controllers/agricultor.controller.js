const AgricultorService = require('../services/agricultor.service');

exports.getAllAgricultores = async (req, res, next) => {
  try {
    const agricultores = await AgricultorService.findAll();
    res.status(200).json(agricultores);
  } catch (error) {
    next(error);
  }
};

exports.getAgricultorById = async (req, res, next) => {
  try {
    const agricultor = await AgricultorService.findById(req.params.id);
    if (!agricultor) {
      return res.status(404).json({ message: 'Agricultor no encontrado' });
    }
    res.status(200).json(agricultor);
  } catch (error) {
    next(error);
  }
};

exports.createAgricultor = async (req, res, next) => {
  try {
    const newAgricultor = await AgricultorService.create(req.body);
    res.status(201).json(newAgricultor);
  } catch (error) {
    next(error);
  }
};

exports.updateAgricultor = async (req, res, next) => {
  try {
    const updatedAgricultor = await AgricultorService.update(req.params.id, req.body);
    res.status(200).json(updatedAgricultor);
  } catch (error) {
    next(error);
  }
};

exports.deleteAgricultor = async (req, res, next) => {
  try {
    await AgricultorService.delete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};