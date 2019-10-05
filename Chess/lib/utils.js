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
