const router = require('express').Router();

const { logIn, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signinValidation, signupValidation } = require('../middlewares/validate');

const { usersRouter } = require('./users');
const { moviesRouter } = require('./movies');

const { ...errors } = require('../errors/CustClasses');

const {
  NotFoundError,
} = errors;

router.post('/signin',signinValidation, logIn); // создаёт пользователя с переданными в теле email, password и name
router.post('/signup',signupValidation, createUser); // проверяет переданные в теле почту и пароль и возвращает JWT

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// Обработка неправильного пути
router.use('*', () => {
  throw new NotFoundError();
});

module.exports = router;
