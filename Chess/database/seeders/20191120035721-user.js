'use strict';

const { User } = require('../../app/models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.bulkCreate([
      {
        id: 1,
        name: 'Micael Levi Lima Cavalcante',
        email: 'mllc@icomp.ufam.edu.br',
        password: '123456',
        id_curso: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'Ana',
        email: 'ana@gmail.com',
        password: '123456',
        id_curso: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'João Byte',
        email: 'jb@gmail.com',
        password: '123456',
        id_curso: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], { validate: true, individualHooks: true });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
