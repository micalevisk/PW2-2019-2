/* eslint-disable no-restricted-syntax */

module.exports = {

  // ████████╗███████╗██╗  ██╗████████╗
  // ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝
  //    ██║   █████╗   ╚███╔╝    ██║
  //    ██║   ██╔══╝   ██╔██╗    ██║
  //    ██║   ███████╗██╔╝ ██╗   ██║
  //    ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝

  toUpper: (str) => (str || '').toUpperCase(),


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
