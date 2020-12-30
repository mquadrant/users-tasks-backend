const createError = require('http-errors');
const express = require('express');
const path = require('path');
import ora from 'ora';
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import MakeDb from './database/connection';
const mongoThrobber = ora();

import indexRouter from './routes/index';
import config from './config';

const app = express();

new MakeDb()
  .then(() => {
    mongoThrobber.succeed(`${config.app_name}-DB  Ready! ${config.port}`)
  }).catch((err) => {
    mongoThrobber.fail(`Could not connect to ${config.app_name}-DB because of ${err}`)
  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
