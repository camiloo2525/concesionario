const express = require('express');
const router = express.Router();
const vehiculosCrud = require('../CRUD/vehiculosCrud');

router.post('/', vehiculosCrud.createVehiculo);
router.get('/', vehiculosCrud.getVehiculos);
router.get('/:id', vehiculosCrud.getVehiculo);
router.put('/:id', vehiculosCrud.updateVehiculo);
router.delete('/:id', vehiculosCrud.deleteVehiculo);

module.exports = router;