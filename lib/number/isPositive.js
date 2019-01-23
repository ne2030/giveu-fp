const { pipe } = require('fxjs2');
const isEqual = require('../etc/isEqual');

// isPositive
module.exports = pipe(
    Math.sign,
    isEqual(1)
);
