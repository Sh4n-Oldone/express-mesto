const usersRouter = require('express').Router();
const users = require('../data/users.json');

usersRouter.get('/', (req, res) => {
  res.status(200).json(users);
  console.log(`Отдал users: ${users}`);
});

usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const reqUser = users.find(user => user._id === id)
  if (reqUser) {
    res.status(200).send(reqUser);
  } else {
    res.status(404).json({"message": "Нет пользователя с таким id"});
  }
});

// usersRouter.get('/', (req, res) => {
//   const dataPath = path.join(__dirname, 'data', 'users.json');
//   const usersData = fs.readFile(dataPath, { encoding: 'utf8' });
//   res.status(200).json(usersData);
//   console.log(`Отдал users: ${users}`);
// });

// usersRouter.get('/:id', (req, res) => {
//   const dataPath = path.join(__dirname, 'data', 'users.json');
//   const usersData = fs.readFile(dataPath, { encoding: 'utf8' });
//   const { id } = req.params;
//   const reqUser = usersData.find(user => user._id === id);
//   if (reqUser) {
//     res.status(200).send(reqUser);
//   } else {
//     res.status(404).json({"message": "Нет пользователя с таким id"});
//   }
// });

module.exports = usersRouter;