const mongoose = require("mongoose");

const usuariosSchema = mongoose.Schema({
  nombre: { type: String, required: true, trim: true }, // trim elimina los espacios en blanco inicial y final
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  admin: {type: Boolean, required: false,}
},{ versionKey:false });

module.exports = mongoose.model("usuario", usuariosSchema);