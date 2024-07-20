const express = require('express');
const router = express.Router();
const concesionarioCrud = require('../CRUD/concesionarioCrud');

router.post('/', concesionarioCrud.createConcesionario);
router.get('/', concesionarioCrud.getConcesionarios);
router.get('/:id', concesionarioCrud.getConcesionario);
router.put('/:id', concesionarioCrud.updateConcesionario);
router.delete('/:id', concesionarioCrud.deleteConcesionario);

module.exports = router;
