const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { ...errors } = require('../errors/CustClasses');

const {
  NotFoundError,
  BadRequestError,
  ConflictError,
} = errors;

const options = { new: true, runValidators: true };

const { JWT_SECRET } = require('../utils/constants');

// Получить инфо текущего пользователя
function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => res.send(user))
    .catch(next);
}

// Обновить юзера
function updateUser(req, res, next) {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, options)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
}

// Cоздать юзера
function createUser(req, res, next) {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError());
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    })
    .catch(next);
}

// Залогиниться
function logIn(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: '30d' },
        ),
      });
    })
    .catch(next);
}

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  logIn,
};
