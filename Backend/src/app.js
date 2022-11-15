const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));

//Configurar cabeceras y cors 
app.use(cors());

/* Prefijos */

app.use('/api/dulces', require('./routers/dulces'))
app.use("/api/usuarios", require("./routers/usuarios"));
app.use("/api/auth", require("./routers/auth"));

module.exports=app;