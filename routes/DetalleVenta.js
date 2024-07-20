const express = require('express');
const router = express.Router();
const detalleVentaCrud = require('../CRUD/detalleVentaCrud');

router.post('/', detalleVentaCrud.createDetalleVenta);
router.get('/', detalleVentaCrud.getDetallesVenta);
router.get('/:id', detalleVentaCrud.getDetalleVenta);
router.put('/:id', detalleVentaCrud.updateDetalleVenta);
router.delete('/:id', detalleVentaCrud.deleteDetalleVenta);

module.exports = router;