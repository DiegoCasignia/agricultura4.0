const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller');

// CRUD Facturas
router.get('/', facturaController.getAllFacturas);
router.get('/:id', facturaController.getFacturaById);
router.post('/', facturaController.createFactura);
router.put('/:id', facturaController.updateFactura);
router.delete('/:id', facturaController.deleteFactura);

// Rutas específicas
router.get('/cosecha/:cosechaId', facturaController.getFacturaByCosechaId);
router.put('/:id/pagar', facturaController.marcarComoPagada);

module.exports = router;