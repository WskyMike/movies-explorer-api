const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/constants');

const { ...errors } = require('../errors/CustClasses');

const {
  UnauthorizedError,
} = errors;

function auth(req, res, next) {
  const { authorization } = req.headers; // Авторизационный заголовок

  if (!authorization) {
    next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  if (!token) return;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
}

module.exports = auth;
