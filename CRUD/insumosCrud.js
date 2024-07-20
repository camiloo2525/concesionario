const pool = require('../base');

// Crear un nuevo insumo
exports.createInsumo = async (req, res) => {
  const { nombre_insumo, descripcion_insumo, precio_insumo, id_almacen } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO insumos (nombre_insumo, descripcion_insumo, precio_insumo, id_almacen) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre_insumo, descripcion_insumo, precio_insumo, id_almacen]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Obtener todos los insumos
exports.getInsumos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM insumos');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Obtener un insumo por id
exports.getInsumo = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM insumos WHERE id_insumo = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Actualizar un insumo
exports.updateInsumo = async (req, res) => {
  const id = req.params.id;
  const { nombre_insumo, descripcion_insumo, precio_insumo, id_almacen } = req.body;
  try {
    const result = await pool.query(
      'UPDATE insumos SET nombre_insumo = $1, descripcion_insumo = $2, precio_insumo = $3, id_almacen = $4 WHERE id_insumo = $5 RETURNING *',
      [nombre_insumo, descripcion_insumo, precio_insumo, id_almacen, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status  (500).json({ error });
  }
};

// Eliminar un insumo
exports.deleteInsumo = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM insumos WHERE id_insumo = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};
