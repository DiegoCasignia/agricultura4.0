const express = require('express');
const router = express.Router();
const agricultorController = require('../controllers/agricultor.controller');

// CRUD Agricultores
router.get('/', agricultorController.getAllAgricultores);
router.get('/:id', agricultorController.getAgricultorById);
router.post('/', agricultorController.createAgricultor);
router.put('/:id', agricultorController.updateAgricultor);
router.delete('/:id', agricultorController.deleteAgricultor);

module.exports = router;