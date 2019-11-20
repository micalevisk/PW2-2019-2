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
const { connectToSession } = require('./config/sessionStore');
const routes = require('./routes');

const {
  SESSION_SECRET = 'ZghOT0eRm4U9s:p/q2-q4!', // (chess move in descriptive notation)
  SESSION_NAME = 'sid',
  SESSION_LIFETIME = 1000 * 60 * 60 * 2, // 2 hours
} = process.env;

const app = express();

const isDevelopment = (app.get('env') === 'development');

const sessionStore = connectToSession(session);

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

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// TODO: refatorar para evitar colisão de nomes de recursos e exposição de arquivos não usados
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', [
  express.static(path.join(__dirname, '/node_modules/jquery/dist')),
  express.static(path.join(__dirname, '/node_modules/popper.js/dist/umd')),
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')),
  express.static(path.join(__dirname, '/node_modules/@chrisoakman/chessboardjs/dist')),
  express.static(path.join(__dirname, '/node_modules/chess.js')),
]);
app.use('/webfonts',
  express.static(path.join(__dirname, '/node_modules/@fortawesome/fontawesome-free/webfonts')));
app.use('/css', [
  express.static(path.join(__dirname, 'node_modules/@chrisoakman/chessboardjs/dist')),
]);

app.use(sass({
  src: path.join(__dirname, 'public', 'scss'),
  dest: path.join(__dirname, 'public', 'css'),
  prefix: '/css',
  debug: isDevelopment,
  outputStyle: 'compressed',
}));

app.use(cookieParser());

app.use(csrf({ cookie: true }));

app.use(session({
  genid: () => uuid(), // Generate the SESSID
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  ...(sessionStore ? {
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  } : {
    resave: true,
    saveUninitialized: true,
  }),
  cookie: {
    maxAge: SESSION_LIFETIME,
    sameSite: true,
    secure: false, // Secure cookies requires an https-enabled
  },
}));

app.use(logger('common'));

/**
 * Routes
 */

app.use(routes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

/* eslint-disable no-unused-vars, no-param-reassign */
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
