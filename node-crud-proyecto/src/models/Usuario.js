const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  email: String
});

module.exports = mongoose.model('Usuario', usuarioSchema);