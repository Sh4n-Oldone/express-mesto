const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка доставки пользователей' }))
};

module.exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' })
      }
      return res.status(200).send(user)
    })
    .catch(() => res.status(500).send({ message: 'Ошибка доставки выбранного пользователя' }))
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .catch((err) => res.status(400).send({ message: err.message })) // ошибка входных данных
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'Ошибка создания нового пользователя' }));
};