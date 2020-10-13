const express = require('express');
const path = require('path');
const routes = require('./routes/index.js');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Работаю! Порт: ${PORT}`);
});
