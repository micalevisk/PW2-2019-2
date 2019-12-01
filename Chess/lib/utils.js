const bcrypt = require('bcryptjs');

const config = require('../config/config.json');

/**
 *
 * @param {string} plainPassword
 * @returns {Promise<string>}
 */
module.exports.cryptPassword = async function cryptPassword(plainPassword) {
  const salt = await bcrypt.genSalt(config.bcryptRound);
  const encryptedPassword = await bcrypt.hash(plainPassword, salt);
  return encryptedPassword;
};

/**
 *
 * @param {string} password1
 * @param {string} password2
 * @returns {string}
 */
module.exports.comparePasswords = function comparePasswords(password1, password2) {
  return bcrypt.compare(password1, password2);
};

/**
 *
 * @param {function}
 * @returns {function}
 */
module.exports.wrapAsync = function wrapAsync(fn) {
  return function __catchAsyncError(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
module.exports.capitalize = function capitalize(str) {
  return str.toLowerCase().replace(
    /(?:^|\s)\S(?=\S{2,})/g, // Matches every boundary non-whitespace followed by 2 any non-whitespace
    (letter) => letter.toUpperCase(),
  );
};

/**
 *
 * @param {boolean} userIsOwner
 * @param {string} ownerColorId
 * @returns {['white','black']|['black','white']}
 */
module.exports.getBoardOrientation = function getBoardOrientation(userIsOwner, ownerColorId) {
  const whiteBasedColors = ['white', 'black', 'white'];
  const offset = (!!userIsOwner + (ownerColorId === 'w')) % 2;
  return whiteBasedColors.slice(0 + offset, 2 + offset);

  /*
  0 0 W  (sum = 0)
  0 1 B  (sum = 1)
  1 0 B  (sum = 1)
  1 1 W  (sum = 2)
  | | |
  | | +-> W means `whiteBasedColors`; B means `blackBasedColors`
  | +-> owner color id is 'w'
  +-> user is owner
  */

  /* // Lógica completa:
  const blackBasedColors = ['black', 'white'];
  const colors = [
    [// 0 == user is not the owner
      whiteBasedColors, // 0 == owner color is not 'w'
      blackBasedColors, // 1
    ],
    [// 1
      blackBasedColors, // 0
      whiteBased, // 1
    ],
  ];

  // 0 will be the orientation ('white' or 'black') for the callee
  return colors[+!!userIsOwner][+(ownerColorId === 'w')];
  */
};

/**
 *
 * @param {string} userName
 * @returns {string|undefined}
 */
module.exports.getFirstname = function getFirstname(userName) {
  if (userName) {
    return userName.split(' ', 1)[0];
  }

  return undefined;
};
