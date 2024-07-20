const express = require('express');
const router = express.Router();
const almacenCrud = require('../CRUD/almacenCrud');

router.post('/', almacenCrud.createAlmacen);
router.get('/', almacenCrud.getAlmacenes);
router.get('/:id', almacenCrud.getAlmacen);
router.put('/:id', almacenCrud.updateAlmacen);
router.delete('/:id', almacenCrud.deleteAlmacen);

module.exports = router;