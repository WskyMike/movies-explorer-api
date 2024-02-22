/* eslint-disable func-names */
const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const { ...errors } = require('../errors/CustClasses');

const {
  UnauthorizedError,
} = errors;

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new Schema({
  name: {
    ...requiredString,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    ...requiredString,
    unique: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
    },
  },
  password: {
    ...requiredString,
    select: false, // По умолчанию хеш пароля пользователя не будет возвращаться из базы.
  },
}, {
  versionKey: false, // убрать версию из схемы
});

// В случае аутентификации вернем хэш пароля
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль 1');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль 2');
          }

          return user;
        });
    });
};

module.exports = model('user', userSchema);
