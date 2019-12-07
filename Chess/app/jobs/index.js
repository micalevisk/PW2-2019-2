const RegistrationNewMessage = require('./RegistrationNewMessage');
const RegistrationNewMove = require('./RegistrationNewMove');

const names = {
  SAVE_MOVEMENT: RegistrationNewMove.key,
  SAVE_MESSAGE: RegistrationNewMessage.key,
};

const jobs = {
  RegistrationNewMove,
  RegistrationNewMessage,
};


module.exports = {
  jobs,
  names,
};
