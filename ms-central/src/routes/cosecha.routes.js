const express = require('express');
const router = express.Router();
const cosechaController = require('../controllers/cosecha.controller');

// CRUD Cosechas
router.get('/', cosechaController.getAllCosechas);
router.get('/:id', cosechaController.getCosechaById);
router.post('/', cosechaController.createCosecha);
router.put('/:id', cosechaController.updateCosecha);
router.delete('/:id', cosechaController.deleteCosecha);

// Estado de cosecha
router.put('/:id/estado', cosechaController.updateEstadoCosecha);

module.exports = router;