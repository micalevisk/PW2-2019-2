'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('area', [
      {
        id: 1,
        name: 'Ciências Exatas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Ciências Humanas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'Ciências Biológicas',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('area', null, {});
  }
};
