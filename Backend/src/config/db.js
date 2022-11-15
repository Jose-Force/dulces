const mongoose = require('mongoose')
require('dotenv').config();

const conectarBD = () =>{
  const MONGO_URL = process.env.MONGO_URL
  mongoose.connect(MONGO_URL)
    .then(() => console.log('La base de datos está conectada'))
    .catch((err) => console.log(err));
}

module.exports = conectarBD;