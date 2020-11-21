const usersRouter = require('express').Router();
const {
  getUsers, getUser, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getMe);
usersRouter.get('/users/:userId', auth, getUser);
usersRouter.patch('/users/me', auth, updateUser);
usersRouter.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = usersRouter;
