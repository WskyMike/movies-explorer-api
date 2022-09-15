const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const linkRegExp = /(http:\/\/|https:\/\/)(www)*[a-z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]+#*/;

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex()
      .messages({
        'string.length': 'Длинна строки с id должна быть 24 символа',
      }),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле с именем обязательно для заполнения',
        'string.min': 'Ограничение поля: минимум 2 символа',
        'string.max': 'Ограничение поля: максимум 30 символов',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.email': 'Здесь должен быть e-mail',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.email': 'Здесь должен быть e-mail',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(55)
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.min': 'Ограничение поля: минимум 2 символа',
        'string.max': 'Ограничение поля: максимум 55 символов',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    director: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.min': 'Ограничение поля: минимум 2 символа',
        'string.max': 'Ограничение поля: максимум 30 символов',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    duration: Joi.string().required().max(6)
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.max': 'Ограничение поля: максимум 6 символов',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    year: Joi.string().required()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    image: Joi.string().required().pattern(linkRegExp)
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.pattern': 'Здесь должна быть ссылка',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    trailer: Joi.string().required().pattern(linkRegExp)
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.pattern': 'Здесь должна быть ссылка',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    thumbnail: Joi.string().required().pattern(linkRegExp)
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.pattern': 'Здесь должна быть ссылка',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    movieId: Joi.string().required()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.min': 'Ограничение поля: минимум 2 символа',
        'string.max': 'Ограничение поля: максимум 30 символов',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
    email: Joi.string().required().email()
      .messages({
        'string.empty': 'Поле обязательно для заполнения',
        'string.email': 'Здесь должен быть e-mail',
        'any.required': 'В запросе отсутствует требуемое поле',
      }),
  }),
});

module.exports = {
  linkRegExp,
  userValidation,
  signupValidation,
  signinValidation,
  idValidation,
  movieValidation,
};
