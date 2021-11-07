const express = require("express");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser'); 



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const rutas = require('./routes/routes');

//setting
app.use(express.static(path.join(__dirname, '/frontend')));


//routes
app.use(rutas);



///listening the server
app.listen(PORT, () => {
    console.log(`Escuchando el puerto http://localhost:${PORT}`)
  });