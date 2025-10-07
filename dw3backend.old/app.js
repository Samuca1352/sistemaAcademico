const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Carrega o módulo de rotas
const router = require('./routes/router.js');

const app = express();
const port = 40000;

// app.set('view engine', 'ejs'); // Linha para motor de visualização comentada
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.json());

//@ Utiliza o router configurado em ./routes.js
app.use(router);

app.listen(port, () => {
    console.log(`App ouvindo na porta ${port}`)
})

