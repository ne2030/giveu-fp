const { curry } = require('fxjs2');

// prefix
module.exports = curry((prefix, str) => prefix + str);
