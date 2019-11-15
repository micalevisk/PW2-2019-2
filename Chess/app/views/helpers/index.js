/* eslint-disable no-restricted-syntax */

module.exports = {

  // ████████╗███████╗██╗  ██╗████████╗
  // ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
  //    ██║   █████╗   ╚███╔╝    ██║
  //    ██║   ██╔══╝   ██╔██╗    ██║
  //    ██║   ███████╗██╔╝ ██╗   ██║
  //    ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝

  toUpper: (str) => (str || '').toUpperCase(),

  capitalizeFirst: (str) => str.charAt(0).toUpperCase() + str.slice(1),

  // ██╗  ██╗████████╗███╗   ███╗██╗
  // ██║  ██║╚══██╔══╝████╗ ████║██║
  // ███████║   ██║   ██╔████╔██║██║
  // ██╔══██║   ██║   ██║╚██╔╝██║██║
  // ██║  ██║   ██║   ██║ ╚═╝ ██║███████╗
  // ╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝╚══════╝

  checked: (refVal = '', optionVal = '') => (refVal.toString() === optionVal.toString() ? 'checked' : ''),

  selected: (refVal = '', optionVal = '') => (refVal.toString() === optionVal.toString() ? 'selected' : ''),

  hasError: (errors, fieldName) => {
    if (errors) {
      for (const error of errors) {
        if (error.path === fieldName) {
          return 'is-invalid'; // CSS class name from Bootswatch.
        }
      }
    }

    return '';
  },

  getOwnerPieceColor: (ownerColor) => (ownerColor === 'w' ? 'white' : 'black'),

  getOpponentPieceColor: (ownerColor) => (ownerColor === 'w' ? 'black' : 'white'),


  // ██████╗ ████████╗██╗  ██╗███████╗██████╗ ███████╗
  // ██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝
  // ██║   ██║   ██║   ███████║█████╗  ██████╔╝███████╗
  // ██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██╗╚════██║
  // ╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║███████║
  //  ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝

  getErrorMsg: (errors, fieldName) => {
    if (errors) {
      for (const error of errors) {
        if (error.path === fieldName) {
          return error.message;
        }
      }
    }

    return '';
  },
};
