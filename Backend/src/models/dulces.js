const mongoose = require('mongoose');

const dulcesSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio_c: {
    type: Number,
    required: true
  },
  precio_v: {
    type: Number,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    required: true
  }
}, { versionKey: false })

module.exports = mongoose.model('Dulces', dulcesSchema)