const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const createError = require('http-errors');
const logger = require('morgan');
const sass = require('node-sass-middleware');
const path = require('path');
const uuid = require('uuid/v4');

const viewsHelpers = require('./app/views/helpers');
const indexRouter = require('./routes');

const app = express();


/**
 * App config
 */

app.disable('x-powered-by');

app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, 'app', 'views', 'layouts'),
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: viewsHelpers,
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app', 'views'));


/**
 * Middlewares
 */

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', [
  express.static(path.join(__dirname, '/node_modules/jquery/dist')),
  express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')),
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')),
]);
app.use('/webfonts',
  express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/webfonts')));

app.use(sass({
  src: path.join(__dirname, 'public', 'scss'),
  dest: path.join(__dirname, 'public', 'css'),
  prefix: '/css',
  debug: (process.env.NODE_ENV === 'development'),
  outputStyle: 'compressed',
}));

app.use(cookieParser());

app.use(csrf({ cookie: true }));

app.use(session({
  genid: () => uuid(), // Generate the SESSID
  secret: 'ZghOT0eRm4U9s:p/q2-q4!', // (chess move in descriptive notation)
  resave: true,
  saveUninitialized: true,
  name: 'sid',
}));

app.use(logger('common'));

/**
 * Routes
 */

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

// error handler middleware
app.use((err, req, res, next) => {
  err.status = err.status || 500;

  // set locals, only providing error details in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status);

  // If CSRF token validation fails
  if (err.code === 'EBADCSRFTOKEN') {
    return res.end('Invalid CSRF Token!');
  }

  return res.render('error');
});

module.exports = app;
