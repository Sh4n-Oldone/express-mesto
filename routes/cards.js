const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, removeCard, getCard, putLikeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
cardsRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), removeCard);
cardsRouter.get('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
}), getCard);
cardsRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
  user: Joi.object().keys({
    _id: Joi.objectId().required(),
  }),
}), putLikeCard);
cardsRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId().required(),
  }),
  user: Joi.object().keys({
    _id: Joi.objectId().required(),
  }),
}), dislikeCard);

module.exports = cardsRouter;
