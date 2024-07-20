const express = require('express');
const pool = require('./base');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
app.use(express.json());


const ConcesionarioRouter = require('./routes/Concesionario');
const VehiculosRouter = require('./routes/Vehiculos');
const InsumosRouter = require('./routes/Insumos');
const AlmacenRouter = require('./routes/Almacen');
const EmpleadoRouter = require('./routes/Empleado');
const ClienteRouter = require('./routes/Cliente');
const VentaRouter = require('./routes/Venta');
const DetalleVentaRouter = require('./routes/DetalleVenta');


app.use('/concesionarios' , ConcesionarioRouter);
app.use('/vehiculos' , VehiculosRouter);
app.use('/almacenes', AlmacenRouter);
app.use('/insumos', InsumosRouter);
app.use('/empleados', EmpleadoRouter);
app.use('/clientes', ClienteRouter);
app.use('/ventas', VentaRouter);
app.use('/detalles', DetalleVentaRouter);


app.listen(PORT, () => {
  console.log(`Ejemplo de una app corriendo en  http://localhost:${PORT}`);
});
