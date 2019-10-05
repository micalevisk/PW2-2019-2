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

  checked: (idArea, radioBtnId) => (idArea === radioBtnId ? 'checked' : ''),

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
