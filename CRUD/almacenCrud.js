const pool = require('../base');

// Crear un nuevo almacen
exports.createAlmacen = async (req, res) => {
  const { nombre_almacen, ubicacion_almacen } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO almacen (nombre_almacen, ubicacion_almacen) VALUES ($1, $2) RETURNING *',
      [nombre_almacen, ubicacion_almacen]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear almacen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener todos los almacenes
exports.getAlmacenes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM almacen');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener almacenes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener un almacen por ID
exports.getAlmacen = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM almacen WHERE id_almacen = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Almacen no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener almacen por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un almacen
exports.updateAlmacen = async (req, res) => {
  const id = req.params.id;
  const { nombre_almacen, ubicacion_almacen } = req.body;
  try {
    const result = await pool.query(
      'UPDATE almacen SET nombre_almacen = $1, ubicacion_almacen = $2 WHERE id_almacen = $3 RETURNING *',
      [nombre_almacen, ubicacion_almacen, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Almacen no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar almacen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar un almacen
exports.deleteAlmacen = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM almacen WHERE id_almacen = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar almacen:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
