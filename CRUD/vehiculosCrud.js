const pool = require('../base');

exports.createVehiculo = async (req, res) => {
  const { marca, modelo, precio, id_concesionario } = req.body;
  try {
    const result = await pool.query('INSERT INTO vehiculos (marca, modelo, precio, id_concesionario) VALUES ($1, $2, $3, $4) RETURNING *', [marca, modelo, precio, id_concesionario]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getVehiculos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehiculos');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getVehiculo = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM vehiculos WHERE id_vehiculo = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateVehiculo = async (req, res) => {
  const id = req.params.id;
  const { marca, modelo, precio, id_concesionario } = req.body;
  try {
    const result = await pool.query('UPDATE vehiculos SET marca = $1, modelo = $2, precio = $3, id_concesionario = $4 WHERE id_vehiculo = $5 RETURNING *', [marca, modelo, precio, id_concesionario, id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteVehiculo = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM vehiculos WHERE id_vehiculo = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};
