const router = require('express').Router();

const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const NotFoundError = require('../errors/notFoundError.js');

router.use(
  usersRouter,
  cardsRouter,
  (req, res) => {
    throw new NotFoundError('запрашиваемый ресурс не найден');
  },
);

module.exports = router;
