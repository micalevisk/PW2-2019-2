const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
const viewsHelpers = require('./app/views/helpers');

const indexRouter = require('./routes');

const app = express();

/**
 * App configs
 */

app.disable('x-powered-by');

app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, '/app/views/layouts'),
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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', [
  express.static(path.join(__dirname, '/node_modules/jquery/dist')),
  express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')),
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')),
]);

app.use(sass({
  src: path.join(__dirname, 'public', 'scss'),
  dest: path.join(__dirname, 'public', 'css'),
  prefix: '/css',
  debug: (process.env.NODE_ENV === 'development'),
  outputStyle: 'compressed',
}));

/* Routes */
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
