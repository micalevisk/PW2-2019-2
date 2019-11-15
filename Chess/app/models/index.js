const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development'; // Define o tipo de servidor
// eslint-disable-next-line import/no-dynamic-require
const config = require(path.join(__dirname, '..', '..', 'config', 'database.js'))[env];

let connection;
if (config.use_env_variable) {
  connection = new Sequelize(process.env[config.use_env_variable], config);
} else {
  connection = new Sequelize(config.database, config.username, config.password, config);
}

// TODO: refatorar para automatizar partes repetidas, usando o Consign
const Area = require('./area');
const Curso = require('./curso');
const Mensagem = require('./mensagem');
const Partida = require('./partida');
const User = require('./user');

Area.init(connection);
Curso.init(connection);
Mensagem.init(connection);
Partida.init(connection);
User.init(connection);

Area.associate(connection.models);
Curso.associate(connection.models);
Partida.associate(connection.models);

module.exports = {
  Sequelize,
  connection,

  // Models
  Area,
  Curso,
  Mensagem,
  Partida,
  User,
};
