module.exports = {
  toUpper: (str) => str.toUpperCase(),

  checked: (idArea, radioBtnId) => (idArea === radioBtnId) && 'checked',

  hasError: (errors, fieldName) => {
    if (errors) {
      const relativeError = errors.find((error) => error.path === fieldName);

      if (relativeError) {
        return 'is-invalid';
      }
    }

    return '';
  },

  getErrorForField: (errors, fieldName) => {
    if (errors) {
      const relativeError = errors.find((error) => error.path === fieldName);
      return relativeError.message;
    }

    return '';
  },
};
