const cardsRouter = require('express').Router();

const {
  getCards, createCard, removeCard, getCard, putLikeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', removeCard);
cardsRouter.get('/cards/:cardId', getCard);
cardsRouter.put('/cards/:cardId/likes', putLikeCard);
cardsRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
