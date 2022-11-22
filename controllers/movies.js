const Movie = require('../models/movie');

const { ...errors } = require('../errors/CustClasses');

const {
  NotFoundError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
} = errors;

//  Получить все фильмы
function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch(next);
}

// Создать фильм
function createMovie(req, res, next) {
  const owner = req.user._id;

  Movie.create({
    ...req.body,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError());
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
}

// Найти фильм по ID и удалить
function deleteMovie(req, res, next) {
  const owner = req.user._id;
  const movieId = req.params._id;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        Movie.findByIdAndRemove(movieId)
          .then((movieData) => res.send(movieData))
          .catch(next);
      } else {
        next(new ForbiddenError());
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
}

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
