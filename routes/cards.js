const router = require('express').Router();
const cardsRouter = require('express').Router();
const cards = require('../data/cards.json');

cardsRouter.get('/', (req, res) => {
  res.status(200).send(cards);
});

module.exports = cardsRouter;