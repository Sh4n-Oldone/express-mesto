const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');
const usersData = fs.readFileSync(dataPath, { encoding: 'utf8' });

usersRouter.get('/', (req, res) => {
  res.status(200).send(JSON.parse(usersData));
  console.log(`Отдал users: ${usersData}`);
});

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const reqUser = JSON.parse(usersData).find(user => user._id === id)
  if (reqUser) {
    res.status(200).send(reqUser);
  } else {
    res.status(404).json({"message": "Нет пользователя с таким id"});
  }
});

module.exports = usersRouter;