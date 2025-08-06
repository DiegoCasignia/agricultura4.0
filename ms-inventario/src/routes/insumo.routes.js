const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumo.controller');

// CRUD Insumos
router.get('/', insumoController.getAllInsumos);
router.get('/:id', insumoController.getInsumoById);
router.post('/', insumoController.createInsumo);
router.put('/:id', insumoController.updateInsumo);
router.delete('/:id', insumoController.deleteInsumo);

// Operaciones específicas de inventario
router.post('/ajustar-stock', insumoController.updateStockInsumo);

module.exports = router;