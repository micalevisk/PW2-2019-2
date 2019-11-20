const debug = require('debug');
const fs = require('fs');

const __DEV__ = global.__DEV__ = (process.env.NODE_ENV === 'development');
const __PROD__ = global.__PROD__ = (process.env.NODE_ENV === 'production');

/**
 * Load environment variables.
 */
require('dotenv-safe').config({
  allowEmptyValues: false,
  example: __PROD__ ? '.env.prod.example' : '.env.dev.example',
  path: __DEV__ ? '.env.dev' : '.env',
});

/**
 * Configure global logger (debug).
 */
const appLogger = debug('chess');
global.logger = (namespace, delimiter = ':') => {
  const log = appLogger.extend(namespace, delimiter);
  log.error = log.extend('error');
  log.error.bind(console.error);
  return log;
};


const log = logger('config');

process.on('unhandledRejection', (reason) => {
  log.error('Unhandled Rejection at:', reason.stack || reason);

  if (reason.name === 'SequelizeConnectionRefusedError') {
    process.exit(666);
  }
});

process.on('uncaughtException', (err) => {
  fs.writeSync(1, `Caugh exception: ${err}\n`);
  process.exit(1);
});
