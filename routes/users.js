const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

usersRouter.get('/users', (req, res) => fs.readFile(dataPath, 'utf8')
  .then((data) => {
    const usersData = JSON.parse(data);
    res.send(usersData);
  })
  .catch((error) => {
    console.error('Ошибка отправки списка пользователей: ', error.message);
    res.status(500).send({ message: 'Ошибка доставки списка пользователей' });
  }));

usersRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;

  return fs.readFile(dataPath, 'utf8')
    .then((data) => {
      const reqUser = JSON.parse(data).find((user) => user._id === id);
      if (reqUser) {
        res.send(reqUser);
      } else {
        res.status(404).json({ message: 'Нет такого пользователя' });
      }
    })
    .catch((error) => {
      console.error('Ошибка отправки пользователя: ', error.message);
      res.status(500).send({ message: 'Ошибка отправки пользователя' });
    });
});

module.exports = usersRouter;
