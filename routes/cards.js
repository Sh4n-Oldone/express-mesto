const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');
const cardsData = fs.readFileSync(dataPath, { encoding: 'utf8' });

cardsRouter.get('/', (req, res) => {
  res.status(200).send(JSON.parse(cardsData));
});

cardsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const reqCard = JSON.parse(cardsData).find(card => card._id === id)
  if (reqCard) {
    res.status(200).send(JSON.parse(cardsData));
  } else {
    res.status(404).json({"message": "Нет такой карточки"});
  }
});

module.exports = cardsRouter;