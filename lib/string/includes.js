const { curry } = require('fxjs2');

// includes
module.exports = curry((part, str) => String(str).includes(part));
