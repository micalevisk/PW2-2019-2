const debug = require('debug');
const fs = require('fs');

const isProduction = (process.env.NODE_ENV === 'production');
const isDevelopment = (process.env.NODE_ENV === 'development');

/**
 * Load environment variables.
 */
require('dotenv-safe').config({
  allowEmptyValues: false,
  example: isProduction ? '.env.prod.example' : '.env.example',
  path: isDevelopment ? '.env.dev' : '.env',
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
