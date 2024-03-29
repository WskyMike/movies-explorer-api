class BadRequestError extends Error {
  constructor(message = 'Переданы некорректные данные') {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Недостаточно прав') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Запрашиваемый ресурс не найден') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message = 'Конфликт данных') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

class InternalServerError extends Error {
  constructor(message = 'Странная ошибка сервера') {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
