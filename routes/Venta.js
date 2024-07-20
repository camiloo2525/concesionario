const express = require('express');
const router = express.Router();
const ventaCrud = require('../CRUD/ventaCrud');

router.post('/', ventaCrud.createVenta);
router.get('/', ventaCrud.getVentas);
router.get('/:id', ventaCrud.getVenta);
router.put('/:id', ventaCrud.updateVenta);
router.delete('/:id', ventaCrud.deleteVenta);

module.exports = router;