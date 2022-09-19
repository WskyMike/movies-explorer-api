const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlRequired = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value)) {
    return value
  }
  return helpers.message('Здесь должна быть ссылка');
})
.messages({
  'string.empty': 'Поле обязательно для заполнения',
  'any.required': 'В запросе отсутствует требуемое поле',
});

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
    duration: Joi.number().required()
      .messages({
        'number.empty': 'Поле обязательно для заполнения',
        'number.max': 'Ограничение поля: максимум 6 символов',
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
    image: urlRequired,
    trailerLink: urlRequired,
    thumbnail: urlRequired,
    movieId: Joi.number().required()
      .messages({
        'number.empty': 'Поле обязательно для заполнения',
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
  userValidation,
  signupValidation,
  signinValidation,
  idValidation,
  movieValidation,
};
