const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', celebrate({
  user: Joi.object(),
}), getMe);
usersRouter.get('/users/:userId', getUser);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    user: Joi.object(),
    avatar: Joi.string(),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
