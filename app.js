/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet'); // HELMET Сonfiguring headers for protection
const cors = require('cors'); // CORS

const { errors } = require('celebrate'); // Celebrate JOI
const errorHandler = require('./middlewares/centralErrorHandler'); // Центральная обработка ошибок

const { requestLogger, errorLogger } = require('./middlewares/logger'); // Логгирование
const limiter = require('./middlewares/limiter'); // DDoS protector

const app = express();
const { PORT, MONGODB } = require('./utils/constants');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(limiter);

app.use(requestLogger); // Запросы

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes'));

app.use(errorLogger); // Ошибки

app.use(errors()); // JOI

app.use(errorHandler);

// Подключение //
async function connection() {
  await mongoose.connect(MONGODB, {
    useNewUrlParser: true,
  });
  console.log('Connected to MongoDB');
  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}
connection();
