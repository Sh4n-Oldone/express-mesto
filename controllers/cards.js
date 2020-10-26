const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка доставки карточек' }))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .catch((err) => res.status(400).send({ message: err.message })) // ошибка входных данных
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Ошибка создания карточки' }))
}

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, (error, deletedCard) => {
    if (!error) {
      return res.status(200).send({ message: `${deletedCard} - удалена` })
    }
    return res.status(404).send({ message: 'Карточка не найдена' })
  })
    .catch(() => res.status(500).send({ message: 'Ошибка при удалении карточки' }))
}

module.exports.getCard = (req, res) => {
  Card.find({ _id: req.params.cardId }, (error, requestedCard) => {
    if (!error) {
      return res.status(200).send(requestedCard)
    }
      return res.status(404).send({ message: 'Карточка не найдена' })
  })
    .catch(() => res.status(500).send({ message: 'Ошибка при поиске карточки' }))
}