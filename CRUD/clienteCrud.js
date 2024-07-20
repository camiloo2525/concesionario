const pool = require('../base');

// Crear un cliente
exports.createCliente = async (req, res) => {
  const { nombre_cliente, direccion_cliente, id_concesionario } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO cliente (nombre_cliente, direccion_cliente, id_concesionario) VALUES ($1, $2, $3) RETURNING *',
      [nombre_cliente, direccion_cliente, id_concesionario]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente: ' + error.message });
  }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cliente');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes: ' + error.message });
  }
};

// Obtener un cliente por ID
exports.getCliente = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente: ' + error.message });
  }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
  const id = req.params.id;
  const { nombre_cliente, direccion_cliente, id_concesionario } = req.body;
  try {
    const result = await pool.query(
      'UPDATE cliente SET nombre_cliente = $1, direccion_cliente = $2, id_concesionario = $3 WHERE id_cliente = $4 RETURNING *',
      [nombre_cliente, direccion_cliente, id_concesionario, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente: ' + error.message });
  }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente: ' + error.message });
  }
};