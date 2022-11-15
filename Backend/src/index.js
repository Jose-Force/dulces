/* Este archivo solo crea el servidor en el puerto 4000 y conecta la base de datos*/
const app = require('./app');
const conectarBD = require('./config/db');

const port = 4000;
conectarBD()

app.listen(port, ()=>{
  console.log(`Server up running in http://localhost:${port}`);
});
