const { curry } = require('fxjs2');
const isEqual = require('./isEqual');

// isNotEqual
module.exports = curry((a, b) => !isEqual(a, b));
