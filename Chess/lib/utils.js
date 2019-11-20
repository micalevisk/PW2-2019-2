const bcrypt = require('bcryptjs');

const config = require('../config/config.json');

module.exports.cryptPassword = async function cryptPassword(plainPassword) {
  const salt = await bcrypt.genSalt(config.bcryptRound);
  const encryptedPassword = await bcrypt.hash(plainPassword, salt);
  return encryptedPassword;
};

module.exports.comparePasswords = function comparePasswords(password1, password2) {
  return bcrypt.compare(password1, password2);
};

module.exports.wrapAsync = function wrapAsync(fn) {
  return function __catchAsyncError(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
};

module.exports.capitalize = function capitalize(str) {
  return str.toLowerCase().replace(
    /(?:^|\s)\S(?=\S{2,})/g, // Matches every boundary non-whitespace followed by 2 any non-whitespace
    (letter) => letter.toUpperCase(),
  );
};

module.exports.getBoardOrientation = function getBoardOrientation(userIsOwner, ownerColorId) {
  if (userIsOwner) {
    return (ownerColorId === 'w' ? 'white' : 'black');
  }

  return (ownerColorId === 'w' ? 'black' : 'white');
};
