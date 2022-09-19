const { Schema, model } = require('mongoose');
const validator = require('validator');

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const requiredURL = {
  ...requiredString,
  validate: {
    validator: (link) => {
      return validator.isURL(link)
    },
    message: 'Здесь должна быть ссылка',
  },
};

const movieSchema = new Schema({
  country: {
    ...requiredString,
  },
  director: {
    ...requiredString,
  },
  duration: {
    ...requiredNumber,
  },
  year: {
    ...requiredString,
  },
  description: {
    ...requiredString,
  },
  image: {
    ...requiredURL,
  },
  trailerLink: {
    ...requiredURL,
  },
  thumbnail: {
    ...requiredURL,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    ...requiredNumber,
  },
  nameRU: {
    ...requiredString,
  },
  nameEN: {
    ...requiredString,
  },
}, {
  versionKey: false, // убрать версию из схемы
});

module.exports = model('movie', movieSchema);
