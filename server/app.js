const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const clientsRouter = require('./routes/api/clients');
const usersRouter = require('./routes/api/employee');
const actionRouter = require('./routes/api/action')

const app = express();


app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', indexRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/employee', usersRouter);
app.use('/api/action', actionRouter);


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
  res.json(err);
});

module.exports = app;
