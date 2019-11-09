const connectRedis = require('connect-redis');
const redis = require('redis');

const log = logger('session-store');

/**
 * @param {object} session
 * @returns {RedisStore} the store.
 */
module.exports.connectToSession = function connectToSession(session) {
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
