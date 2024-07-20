const pool = require('../base');

// Crear un empleado
exports.createEmpleado = async (req, res) => {
  const { nombre_empleado, cargo_empleado, salario_empleado, id_concesionario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO empleado (nombre_empleado, cargo_empleado, salario_empleado, id_concesionario) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre_empleado, cargo_empleado, salario_empleado, id_concesionario]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear empleado: ' + error.message });
  }
};

// Obtener todos los empleados
exports.getEmpleados = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM empleado');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleados: ' + error.message });
  }
};

// Obtener un empleado por ID
exports.getEmpleado = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM empleado WHERE id_empleado = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleado: ' + error.message });
  }
};

// Actualizar un empleado
exports.updateEmpleado = async (req, res) => {
  const id = req.params.id;
  const { nombre_empleado, cargo_empleado, salario_empleado, id_concesionario } = req.body;
  try {
    const result = await pool.query(
      'UPDATE empleado SET nombre_empleado = $1, cargo_empleado = $2, salario_empleado = $3, id_concesionario = $4 WHERE id_empleado = $5 RETURNING *',
      [nombre_empleado, cargo_empleado, salario_empleado, id_concesionario, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empleado: ' + error.message });
  }
};

// Eliminar un empleado
exports.deleteEmpleado = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM empleado WHERE id_empleado = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empleado: ' + error.message });
  }
};