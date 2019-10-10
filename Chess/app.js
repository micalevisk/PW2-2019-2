const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
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

app.use(logger('tiny'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(csrf({ cookie: true }));

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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  err.status = err.status || 500;
  res.status(err.status);
  res.render('error', { error: err });
});

module.exports = app;
