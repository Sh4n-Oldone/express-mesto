const express = require('express');
const path = require('path');
const app = express();
const { PORT = 3000, BASE_PATH } = process.env;
const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('/', (req, res) => {
  res.status(404).json({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`Работаю! Порт: ${PORT}`);
});