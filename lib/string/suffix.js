const { curry } = require('fxjs2');

// suffix
module.exports = curry((suffix, str) => str + suffix);
