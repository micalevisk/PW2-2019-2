'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('mensagem', [
      { id: 1, id_partida: 4, id_user: 2, text: 'parece  que  o  jogo  empatou,  não  é  mesmo?  LUL', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 2, id_partida: 1, id_user: 2, text: 'parabéns,  parceiro!!!', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 3, id_partida: 1, id_user: 2, text: 'jogou  muito  Kappa', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 4, id_partida: 1, id_user: 2, text: 'kkkkkkk', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 5, id_partida: 1, id_user: 1, text: 'ora, ora', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 6, id_partida: 1, id_user: 1, text: 'xeque-mate né  ma  friend', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 7, id_partida: 1, id_user: 2, text: 'KKKKKK vai sonhando', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 8, id_partida: 1, id_user: 1, text: 'pogchamp aqui', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 9, id_partida: 3, id_user: 2, text: 'nenhum op :(', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 10, id_partida: 3, id_user: 2, text: 'cadêeeeeeee', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 11, id_partida: 3, id_user: 2, text: 'eu quero cafeéeeeee', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 12, id_partida: 4, id_user: 2, text: 'fala algo aí,  parceiro', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 13, id_partida: 4, id_user: 2, text: 'oi???????//', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 14, id_partida: 4, id_user: 2, text: 'alôoooooooooo', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 15, id_partida: 4, id_user: 3, text: 'algo', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 16, id_partida: 4, id_user: 2, text: 'engraçadão vc', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 17, id_partida: 4, id_user: 3, text: 'eu  sei', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 18, id_partida: 4, id_user: 2, text: 'LUL', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 19, id_partida: 4, id_user: 3, text: 'ok, ascii  arts  não  funcionam  mt  bem', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 20, id_partida: 4, id_user: 2, text: 'avá', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 21, id_partida: 4, id_user: 3, text: 'nah', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 22, id_partida: 4, id_user: 2, text: 'para  aí', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
      { id: 23, id_partida: 4, id_user: 2, text: 'sai  tudo  quebradokkk', timestamp: new Date(), created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('mensagem', null, {});
  }
};
