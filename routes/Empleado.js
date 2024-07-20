const express = require('express');
const router = express.Router();
const EmpleadoCrud = require('../CRUD/EmpleadoCrud');

router.post('/', EmpleadoCrud.createEmpleado);
router.get('/', EmpleadoCrud.getEmpleados);
router.get('/:id', EmpleadoCrud.getEmpleado);
router.put('/:id', EmpleadoCrud.updateEmpleado);
router.delete('/:id', EmpleadoCrud.deleteEmpleado);

module.exports = router;
