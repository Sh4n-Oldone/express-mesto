const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

const dataPath = path.join(__dirname, '..', 'data', 'cards.json');

cardsRouter.get('/cards', (req, res) => fs.readFile(dataPath, 'utf8')
  .then((data) => {
    const cardsData = JSON.parse(data);
    res.send(cardsData);
  })
  .catch((error) => {
    console.error('Ошибка отправки списка карточек: ', error.message);
    res.status(500).send({ message: 'Ошибка доставки списка карточек' });
  }));

cardsRouter.get('/cards/:id', (req, res) => {
  const { id } = req.params;

  return fs.readFile(dataPath, 'utf8')
    .then((data) => {
      const reqCard = JSON.parse(data).find((card) => card._id === id);
      if (reqCard) {
        res.send(reqCard);
      } else {
        res.status(404).json({ message: 'Нет такой карточки' });
      }
    })
    .catch((error) => {
      console.error('Ошибка отправки карточки: ', error.message);
      res.status(500).send({ message: 'Ошибка отправки карточки' });
    });
});

module.exports = cardsRouter;
