const express = require('express');
const router = express.Router();
const insumosCrud = require('../CRUD/insumosCrud');

router.post('/', insumosCrud.createInsumo);
router.get('/', insumosCrud.getInsumos);
router.get('/:id', insumosCrud.getInsumo);
router.put('/:id', insumosCrud.updateInsumo);
router.delete('/:id', insumosCrud.deleteInsumo);

module.exports = router;