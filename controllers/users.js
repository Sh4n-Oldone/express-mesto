const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users) {
        return res.status(200).send(users);
      }
      return res.status(404).send({ message: 'Пользователи отсутствуют' });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Ошибка ввода' });
      }
      return res.status(500).send({ message: 'Ошибка доставки пользователей' });
    });
};

module.exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Ошибка ввода' });
      }
      return res.status(500).send({ message: 'Ошибка доставки выбранного пользователя' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ message: `Пользователь ${user} создан` }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Ошибка ввода' });
      }
      return res.status(500).send({ message: 'Ошибка сервера при создании пользователя' });
    });
};
