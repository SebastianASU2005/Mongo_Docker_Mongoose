
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuario'); // Importar el modelo

// Configuración de Express y Body-Parser
const app = express();
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect(`mongodb://localhost:27017/usuariosDB`, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Rutas
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Obtener todos los usuarios
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body); // Crear un nuevo usuario con los datos del cuerpo de la solicitud
    const usuarioGuardado = await nuevoUsuario.save(); // Guardar el usuario en la base de datos
    res.status(201).json(usuarioGuardado); // Responder con el usuario guardado
  } catch (err) {
    res.status(400).json({ error: err.message }); // Manejar errores
  }
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});