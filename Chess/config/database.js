module.exports = {
  development: {
    username: 'root',
    password: 'icomp123',
    database: 'chessapp',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: null,
    password: null,
    database: 'chessapp_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
  },
};
