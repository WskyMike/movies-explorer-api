const usersRouter = require('express').Router();
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');
const { userValidation } = require('../middlewares/validate');

usersRouter.get('/me', getCurrentUser); // возвращает информацию о пользователе (email и имя)
usersRouter.patch('/me', userValidation, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = { usersRouter };
