const pool = require('../base');

// Crear concesionario
exports.createConcesionario = async (req, res) => {
  const { nombre_concesionario, direccion } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO concesionario (nombre_concesionario, direccion) VALUES ($1, $2) RETURNING *',
      [nombre_concesionario, direccion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear concesionario: ' + error.message });
  }
};

exports.getConcesionarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM concesionario');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

exports.getConcesionario = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM concesionario WHERE id_concesionario = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

exports.updateConcesionario = async (req, res) => {
  const id = req.params.id;
  const { nombre_concesionario, direccion } = req.body;
  console.log(req.body); // Agrega esto para depuración
  try {
    const result = await pool.query(
      'UPDATE concesionario SET nombre_concesionario = $1, direccion = $2 WHERE id_concesionario = $3 RETURNING *',
      [nombre_concesionario, direccion, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Concesionario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar concesionario: ' + error.message });
  }
};



exports.deleteConcesionario = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM concesionario WHERE id_concesionario = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};


