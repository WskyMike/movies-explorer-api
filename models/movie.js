const { Schema, model } = require('mongoose');
const { linkRegExp } = require('../middlewares/validate');

const requiredString = {
  type: String,
  required: true,
};

const requiredURL = {
  ...requiredString,
  validate: {
    validator(link) {
      return linkRegExp.test(link);
    },
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
    ...requiredString,
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
  trailer: {
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
    ...requiredString,
  },
  nameRU: {
    ...requiredString,
  },
  nameEN: {
    ...requiredString,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
}, {
  versionKey: false, // убрать версию из схемы
});

module.exports = model('movie', movieSchema);
