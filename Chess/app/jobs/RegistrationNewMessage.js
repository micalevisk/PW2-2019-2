const models = require('../models');

const { Mensagem } = models;

module.exports = {
  key: 'RegistrationNewMessage',
  options: {},

  async handle({ data }) {
    const { newMessageValues } = data;

    await Mensagem.create(newMessageValues);
  },
};
