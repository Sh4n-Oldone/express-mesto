const cardsRouter = require('express').Router();

const {
  getCards, createCard, removeCard, getCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', removeCard);
cardsRouter.get('/cards/:cardId', getCard);

module.exports = cardsRouter;
