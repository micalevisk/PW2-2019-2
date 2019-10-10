'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('curso', [
        {
          id: 1,
          initials: 'IE08',
          name: 'Ciência da Computação',
          description: 'Curso top',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          initials: 'IE15',
          name: 'Ciência da Computação',
          description: 'Curso top',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          initials: 'FT05',
          name: 'Engenharia da Computação',
          description: 'Curso top',
          id_area: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('curso', null, {});
  }
};
