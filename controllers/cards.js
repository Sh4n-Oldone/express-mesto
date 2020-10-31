const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards) {
        return res.status(200).send(cards);
      }
      return res.status(404).send({ message: 'Карточки отсутствуют' });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Ошибка ввода' });
      }
      return res.status(500).send({ message: 'Ошибка доставки карточек' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ message: `Карточка ${card} создана` }))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка ввода данных' });
      }
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Ошибка ввода' });
      }
      return res.status(500).send({ message: 'Ошибка создания на сервере' });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (card) {
        Card.deleteOne(card);
        return res.status(200).send({ message: 'Карточка удалена' });
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Ошибка ввода' });
      }
      return res.status(500).send({ message: 'Ошибка удаления карточки' });
    });
};

module.exports.getCard = (req, res) => {
  Card.findOne({ _id: req.params.cardId })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return res.status(404).send({ message: 'Карточка не найдена' });
    })
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Ошибка ввода' });
      }
      return res.status(500).send({ message: 'Ошибка отправки карточки' });
    });
};

module.exports.putLikeCard = async (req, res) => {
  try {
    const likingCard = await Card.findByIdAndUpdate(
      req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },
    );
    if (!likingCard) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    return res.status(200).send({ message: 'Лайк поставлен успешно' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Ошибка ввода' });
    }
    return res.status(500).send({ message: 'Ошибка сервера при постановке лайка' });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const dislikingCard = await Card.findByIdAndUpdate(
      req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },
    );
    if (!dislikingCard) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    return res.status(200).send({ message: 'Лайк снят успешно' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка валидации' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Ошибка ввода' });
    }
    return res.status(500).send({ message: 'Ошибка сервера при удалении лайка' });
  }
};
