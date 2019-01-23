const { identity } = require('fxjs2');

// tryCatch
module.exports = (fn, errorHandler = identity) => (...args) => {
    try {
        return fn(...args);
    } catch (err) {
        return errorHandler(err);
    }
};
