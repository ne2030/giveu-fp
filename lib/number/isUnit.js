const { curry } = require('fxjs2');

// isUnit
module.exports = curry((unit, n) => n % unit === 0);
