const moviesRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieValidation, idValidation } = require('../middlewares/validate');

moviesRouter.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы
moviesRouter.post('/', movieValidation, createMovie); // создаёт фильм с переданными в теле полями
moviesRouter.delete('/:_id', idValidation, deleteMovie); // удаляет сохранённый фильм по id

module.exports = { moviesRouter };
