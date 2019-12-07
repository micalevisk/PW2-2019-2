const models = require('../models');

const { Partida } = models;

module.exports = {
  key: 'RegistrationNewMove',
  options: {},

  async handle({ data }) {
    const { matchId, newPartidaValues } = data;

    await Partida.update(newPartidaValues, {
      where: {
        id: matchId,
      },
    });
  },
};
