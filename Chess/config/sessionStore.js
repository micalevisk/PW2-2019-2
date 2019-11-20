const connectRedis = require('connect-redis');
const redis = require('redis');

const log = logger('session-store');

const sessionURIIsDefined = () => !!(process.env.SESS_URL);


/**
 * @param {object} session
 * @returns {RedisStore|undefined} the store instance or `undefined`.
 */
module.exports.connectToSession = function connectToSession(session) {
  if (!sessionURIIsDefined()) {
    if (__DEV__) {
      return undefined; // In DEVELOPMENT mode session storage is not required.
    }

    // NOTE: If `dotenv-safe` is working as expected, this line won't be reached:
    throw new Error('Session URI is not defined!');
  }

  const RedisStore = connectRedis(session);

  const redisClient = redis.createClient(process.env.SESS_URL);
  redisClient.unref();
  redisClient.on('error', log.error);

  const redisStore = new RedisStore({
    client: redisClient,
    ttl: 260,
    logErrors: true,
  });

  /*
  // Remove all keys from all databases.
  redisClient.flushall(('ASYNC', (err, done) => {
    if (err) {
      log.error(err);
      throw err;
    }

    if (done !== 'OK') {
      log.error(done);
    } else {
      log('success flushall')
    }
  }));
  */

  return redisStore;
};
