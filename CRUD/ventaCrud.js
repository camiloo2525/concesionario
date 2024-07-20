const pool = require('../base');

// Crear una venta
exports.createVenta = async (req, res) => {
  const { fecha_venta, precio_total, id_empleado, id_cliente } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO venta (fecha_venta, precio_total, id_empleado, id_cliente) VALUES ($1, $2, $3, $4) RETURNING *',
      [fecha_venta, precio_total, id_empleado, id_cliente]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear venta: ' + error.message });
  }
};

// Obtener todas las ventas
exports.getVentas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM venta');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas: ' + error.message });
  }
};

// Obtener una venta por ID
exports.getVenta = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM venta WHERE id_venta = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Venta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener venta: ' + error.message });
  }
};

// Actualizar una venta
exports.updateVenta = async (req, res) => {
  const id = req.params.id;
  const { fecha_venta, precio_total, id_empleado, id_cliente } = req.body;
  try {
    const result = await pool.query(
      'UPDATE venta SET fecha_venta = $1, precio_total = $2, id_empleado = $3, id_cliente = $4 WHERE id_venta = $5 RETURNING *',
      [fecha_venta, precio_total, id_empleado, id_cliente, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Venta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar venta: ' + error.message });
  }
};

// Eliminar una venta
exports.deleteVenta = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM venta WHERE id_venta = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta: ' + error.message });
  }
};
