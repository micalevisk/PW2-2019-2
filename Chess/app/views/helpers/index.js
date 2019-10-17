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

  checked: (refId, radioBtnId) => (refId === radioBtnId ? 'checked' : ''),

  selected: (refId, optionId) => {
    console.log(refId, optionId); // FIXME: está dando number, undefined

    return (refId === optionId ? 'selected' : '');
  },

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
