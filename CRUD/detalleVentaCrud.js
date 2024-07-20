const pool = require('../base');
const nodemailer = require('nodemailer');

// Configuración del transporte para el envío de correos electrónicos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'juancamilosalazarhernandez25@gmail.com',
    pass: 'ybms cjcn kmzu vzae'
  }
});

// Función para enviar correo electrónico
const enviarCorreo = (destinatario, asunto, texto) => {
  const mailOptions = {
    from: 'milo73810@gmail.com',
    to: destinatario,
    subject: asunto,
    text: texto
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

exports.createDetalleVenta = async (req, res) => {
  const { cantidad, precio_unitario, precio_total_venta, id_producto, id_venta, id_vehiculo, id_insumo, tipo_producto } = req.body;
  
  try {
    if (tipo_producto === 'vehiculo') {
      const checkVehiculo = await pool.query('SELECT id_vehiculo FROM vehiculos WHERE id_vehiculo = $1', [id_vehiculo]);
      if (checkVehiculo.rows.length === 0) {
        return res.status(400).json({ error: 'El id_vehiculo proporcionado no existe en la tabla vehiculos' });
      }
    } else if (tipo_producto === 'insumo') {
      const checkInsumo = await pool.query('SELECT id_insumo FROM insumos WHERE id_insumo = $1', [id_insumo]);
      if (checkInsumo.rows.length === 0) {
        return res.status(400).json({ error: 'El id_insumo proporcionado no existe en la tabla insumos' });
      }
    }

    const result = await pool.query(
      'INSERT INTO detalleVenta (cantidad, precio_unitario, precio_total_venta, id_producto, id_venta, id_vehiculo, id_insumo, tipo_producto) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [cantidad, precio_unitario, precio_total_venta, id_producto, id_venta, id_vehiculo, id_insumo, tipo_producto]
    );

    const detalleVenta = result.rows[0];

    // Enviar notificación por correo electrónico
    const correoCliente = 'milo73810@gmail.com'; // Reemplaza con el correo del cliente
    const textoCorreo = `Tu compra ha sido realizada con éxito.\n\nDetalles:\n${JSON.stringify(detalleVenta, null, 2)}`;
    enviarCorreo(correoCliente, 'Confirmación de Compra', textoCorreo);

    res.status(201).json(detalleVenta);
  } catch (error) {
    console.error('Error al crear detalle de venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getDetallesVenta = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        dv.id_detalle_venta,
        dv.cantidad,
        dv.precio_unitario,
        dv.precio_total_venta,
        dv.tipo_producto,
        CASE 
          WHEN dv.tipo_producto = 'vehiculo' THEN v.marca || ' ' || v.modelo
          WHEN dv.tipo_producto = 'insumo' THEN i.nombre_insumo
        END AS nombre_producto,
        CASE 
          WHEN dv.tipo_producto = 'vehiculo' THEN v.precio
          WHEN dv.tipo_producto = 'insumo' THEN i.precio_insumo
        END AS precio_producto,
        vta.fecha_venta,
        vta.precio_total,
        cli.nombre_cliente,
        emp.nombre_empleado
      FROM 
        detalleVenta dv
      LEFT JOIN vehiculos v ON dv.id_vehiculo = v.id_vehiculo
      LEFT JOIN insumos i ON dv.id_insumo = i.id_insumo
      LEFT JOIN venta vta ON dv.id_venta = vta.id_venta
      LEFT JOIN cliente cli ON vta.id_cliente = cli.id_cliente
      LEFT JOIN empleado emp ON vta.id_empleado = emp.id_empleado
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener detalles de venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getDetalleVenta = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`
      SELECT 
        dv.id_detalle_venta,
        dv.cantidad,
        dv.precio_unitario,
        dv.precio_total_venta,
        dv.tipo_producto,
        CASE 
          WHEN dv.tipo_producto = 'vehiculo' THEN v.marca || ' ' || v.modelo
          WHEN dv.tipo_producto = 'insumo' THEN i.nombre_insumo
        END AS nombre_producto,
        CASE 
          WHEN dv.tipo_producto = 'vehiculo' THEN v.precio
          WHEN dv.tipo_producto = 'insumo' THEN i.precio_insumo
        END AS precio_producto,
        vta.fecha_venta,
        vta.precio_total,
        cli.nombre_cliente,
        emp.nombre_empleado
      FROM 
        detalleVenta dv
      LEFT JOIN vehiculos v ON dv.id_vehiculo = v.id_vehiculo
      LEFT JOIN insumos i ON dv.id_insumo = i.id_insumo
      LEFT JOIN venta vta ON dv.id_venta = vta.id_venta
      LEFT JOIN cliente cli ON vta.id_cliente = cli.id_cliente
      LEFT JOIN empleado emp ON vta.id_empleado = emp.id_empleado
      WHERE dv.id_detalle_venta = $1
    `, [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Detalle de venta no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener detalle de venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateDetalleVenta = async (req, res) => {
  const id = req.params.id;
  const { cantidad, precio_unitario, precio_total_venta, id_producto, id_venta, id_vehiculo, id_insumo, tipo_producto } = req.body;
  
  try {
    if (tipo_producto === 'vehiculo') {
      const checkVehiculo = await pool.query('SELECT id_vehiculo FROM vehiculos WHERE id_vehiculo = $1', [id_vehiculo]);
      if (checkVehiculo.rows.length === 0) {
        return res.status(400).json({ error: 'El id_vehiculo proporcionado no existe en la tabla vehiculos' });
      }
    } else if (tipo_producto === 'insumo') {
      const checkInsumo = await pool.query('SELECT id_insumo FROM insumos WHERE id_insumo = $1', [id_insumo]);
      if (checkInsumo.rows.length === 0) {
        return res.status(400).json({ error: 'El id_insumo proporcionado no existe en la tabla insumos' });
      }
    }

    const result = await pool.query(
      'UPDATE detalleVenta SET cantidad = $1, precio_unitario = $2, precio_total_venta = $3, id_producto = $4, id_venta = $5, id_vehiculo = $6, id_insumo = $7, tipo_producto = $8 WHERE id_detalle_venta = $9 RETURNING *',
      [cantidad, precio_unitario, precio_total_venta, id_producto, id_venta, id_vehiculo, id_insumo, tipo_producto, id]
    );

    const detalleVenta = result.rows[0];

    // Enviar notificación por correo electrónico
    const correoCliente = 'milo73810@gmail.com'; // Reemplaza con el correo del cliente
    const textoCorreo = `Tu compra ha sido actualizada con éxito.\n\nDetalles:\n${JSON.stringify(detalleVenta, null, 2)}`;
    enviarCorreo(correoCliente, 'Actualización de Compra', textoCorreo);

    res.status(200).json(detalleVenta);
  } catch (error) {
    console.error('Error al actualizar detalle de venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.deleteDetalleVenta = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM detalleVenta WHERE id_detalle_venta = $1', [id]);
    const detalleVenta = result.rows[0];

    await pool.query('DELETE FROM detalleVenta WHERE id_detalle_venta = $1', [id]);

    // Enviar notificación por correo electrónico
    const correoCliente = 'milo73810@gmail.com'; // Reemplaza con el correo del cliente
    const textoCorreo = `Tu compra ha sido cancelada con éxito.\n\nDetalles:\n${JSON.stringify(detalleVenta, null, 2)}`;
    enviarCorreo(correoCliente, 'Cancelación de Compra', textoCorreo);

    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar detalle de venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
