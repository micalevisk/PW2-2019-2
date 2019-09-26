'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('partida', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user_1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_user_2: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      winner: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fen: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('partida');
  }
};
