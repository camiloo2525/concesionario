const express = require('express');
const router = express.Router();
const clienteCrud = require('../CRUD/clienteCrud');

router.post('/', clienteCrud.createCliente);
router.get('/', clienteCrud.getClientes);
router.get('/:id', clienteCrud.getCliente);
router.put('/:id', clienteCrud.updateCliente);
router.delete('/:id', clienteCrud.deleteCliente);

module.exports = router;