const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { urlencoded } = require('express');
const routes = require('./routes/index.js');
const { login, createUser } = require('./controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Работаю! Порт: ${PORT}`);
});
