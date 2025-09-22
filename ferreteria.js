const express = require('express');
const cors = require('cors');   
const app = express();

app.use(cors());               
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));     

let usuarios = [];
let facturas = [];

// Endpoint para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Endpoint para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { idUsuario, identificacion, nombres, telefono, correo } = req.body;

  const existe = usuarios.find(u => u.idUsuario === idUsuario);
  if (existe) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  const nuevoUsuario = { idUsuario, identificacion, nombres, telefono, correo };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// Endpoint para actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const { identificacion, nombres, telefono, correo } = req.body;

  const usuarioIndex = usuarios.findIndex(u => u.idUsuario === id);
  if (usuarioIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (identificacion) usuarios[usuarioIndex].identificacion = identificacion;
  if (nombres) usuarios[usuarioIndex].nombres = nombres;
  if (telefono) usuarios[usuarioIndex].telefono = telefono;
  if (correo) usuarios[usuarioIndex].correo = correo;

  res.json(usuarios[usuarioIndex]);
});

// Endpoint para eliminar un usuario
app.delete('/usuarios/:idUsuario', (req, res) => {
  const id = req.params.idUsuario;

  const usuarioIndex = usuarios.findIndex(u => u.idUsuario === id);
  if (usuarioIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const eliminado = usuarios.splice(usuarioIndex, 1);

  res.json({ mensaje: 'Usuario eliminado', usuario: eliminado[0] });
});

// Endpoint para obtener todas las facturas
app.get('/facturas', (req, res) => {
  res.json(facturas);
});

// Endpoint para crear una nueva factura
app.post('/facturas', (req, res) => {
  const { idFactura, idUsuario, estado, total, detalle } = req.body;

  const existe = facturas.find(f => f.idFactura === idFactura);
  if (existe) {
    return res.status(400).json({ error: 'La factura ya existe' });
  }

  const nuevaFactura = { idFactura, idUsuario, estado, total, detalle };
  facturas.push(nuevaFactura);
  res.status(201).json(nuevaFactura);
});

// Endpoint para actualizar una factura
app.put('/facturas/:id', (req, res) => {
  const id = req.params.id;
  const { idUsuario, estado, total, detalle } = req.body;

  const facturaIndex = facturas.findIndex(f => f.idFactura === id);
  if (facturaIndex === -1) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  if (idUsuario) facturas[facturaIndex].idUsuario = idUsuario;
  if (estado) facturas[facturaIndex].estado = estado;
  if (total) facturas[facturaIndex].total = total;
  if (detalle) facturas[facturaIndex].detalle = detalle;

  res.json(facturas[facturaIndex]);
});

// Endpoint para eliminar una factura
app.delete('/facturas/:idFactura', (req, res) => {
  const id = req.params.idFactura;

  const facturaIndex = facturas.findIndex(f => f.idFactura === id);
  if (facturaIndex === -1) {
    return res.status(404).json({ error: 'Factura no encontrada' });
  }

  const eliminado = facturas.splice(facturaIndex, 1);

  res.json({ mensaje: 'Factura eliminada', factura: eliminado[0] });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});